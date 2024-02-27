import { Card, Typography, Chip, Button } from '@material-tailwind/react';
import React from 'react';
import { decryptRightAnswer } from '../../utils/cryptoUtils';
import { Calendar, ChevronLeft, ListChecks } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';

/**
 * Defines the structure for User data.
 * @typedef {Object} User
 * @property {string} [name] - The name of the user.
 * @property {string} [document] - The document identifier of the user.
 */
  interface User {
    name?: string;
    document?: string;
  }

  /**
 * Defines the structure for Question detail.
 * @typedef {Object} QuestionDetail
 * @property {number} id - Unique identifier for the question.
 * @property {string} title - Title of the question.
 * @property {string} statement - Statement of the question.
 * @property {string} rightAnswer - Encrypted right answer of the question.
 * @property {number} difficulty - Difficulty level of the question.
 * @property {string} [image] - Optional image related to the question.
 * @property {string} createdAt - Creation date of the question.
 * @property {string} updatedAt - Last update date of the question.
 * @property {null|string} [deletedAt] - Deletion date of the question, if applicable.
 * @property {Array<Object>} alternatives - List of alternatives for the question.
 */
  interface QuestionDetail {
    id: number;
    title: string;
    statement: string;
    rightAnswer: string;
    difficulty: number;
    image?: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null | string;
    alternatives: Array<{
      id: number;
      text: string;
      position: number;
      questionId: number;
      createdAt: string;
      updatedAt: string;
      deletedAt?: null | string;
    }>;
  }

/**
 * Extends QuestionDetail with properties specific to a UserExam.
 * @typedef {QuestionDetail} UserExamQuestion
 * @property {number} position - Position of the question in the exam.
 * @property {number} questionId - Identifier of the question.
 */
  interface UserExamQuestion extends QuestionDetail {
    position: number;
    questionId: number;
  }

  /**
 * Defines the structure for User Exam data.
 * @typedef {Object} UserExam
 * @property {UserExamQuestion[]} questions - Array of questions in the exam.
 * @property {number} id - Unique identifier for the exam.
 * @property {string} name - Name of the exam.
 * @property {string} document - Document identifier associated with the exam.
 * @property {string} examId - Unique exam identifier.
 * @property {number} score - Score obtained in the exam.
 * @property {string} createdAt - Creation date of the exam.
 * @property {string} updatedAt - Last update date of the exam.
 * @property {null|string} [deletedAt] - Deletion date of the exam, if applicable.
 */
  interface UserExam {
    questions: UserExamQuestion[];
    id: number;
    name: string;
    document: string;
    examId: string;
    score: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: null | string;
  }

/**
 * Component to display exam results.
 * @returns {React.ReactElement} The Result component.
 */
function Result() {
  const [user, setUser] = React.useState<User>({});
  const [userExams, setUserExams] = React.useState<UserExam | null>(null);

  /**
  * Receive questions Id
  */
  const questionsToCancel = [32,36,56];

  const navigate = useNavigate();

  /**
   * Fetches user exams data based on the document identifier.
   * @param {string} document - The document identifier to fetch exams for.
   */
  const fetchUserExams = async (document: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/userexams/document/${document}`);
    const data: UserExam = await response.json();

    setUserExams(data);
    fetchQuestionDetails(data.questions, document);
  };

  /**
   * Fetches question details for each question in the exam.
   * @param {UserExamQuestion[]} questions - The questions to fetch details for.
   * @param {string} document - The document identifier used in the request.
   */
  const fetchQuestionDetails = async (questions: UserExam['questions'], document: string) => {
    const promises = questions.map(async (question) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/questions/${question.questionId}`);
      return response.json();
    });

    const questionsDetails: QuestionDetail[] = await Promise.all(promises);

    setUserExams((currentExams) => {
      if (!currentExams) return null;
      const updatedQuestions = currentExams.questions.map((question) => {
        const details = questionsDetails.find((detail) => detail.id === question.questionId);
        return { ...question, ...details };
      });
      return { ...currentExams, questions: updatedQuestions };
    });

    fetchQuestionMirrorAndReorderQuestions(document);
  };

  /**
   * Fetches question order and mirrors, then reorders questions based on this.
   * @param {string} document - The document identifier used in the request.
   */
  const fetchQuestionMirrorAndReorderQuestions = async (document: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/questions-mirror/document/${document}`);
    const { questionMirror } = await response.json();

    if (questionMirror && questionMirror.length) {
      setUserExams((currentExams) => {
        if (!currentExams) return null;
        const reorderedQuestions = questionMirror.map((mirrorId) =>
          currentExams.questions.find((question) => question.id === mirrorId)
        ).filter((question): question is UserExamQuestion => !!question);
        return { ...currentExams, questions: reorderedQuestions };
      });
    }
  };

  React.useEffect(() => {
    const authenticatedUser = localStorage.getItem('authenticated_user');
    if (authenticatedUser) {
      const parsedUser = JSON.parse(authenticatedUser);
      setUser(parsedUser);
      if (parsedUser.cpf) {
        fetchUserExams(parsedUser.cpf);
      }
    }
  }, []);

  return (
    <section className='my-4 h-full w-full overflow-y-scroll'>
      <Button
        className='mb-4 flex items-center gap-2 bg-white/10 text-black hover:scale-110 dark:text-white'
        variant='text'
        size='sm'
        onClick={() => navigate(-1)}
      >
        <ChevronLeft /> Voltar
      </Button>

      <span>
        <Typography variant="lead" className="-mb-2">
            Olá
        </Typography>
        <Typography className="" variant="h2">
          {user.name}
        </Typography>
      </span>

      {userExams && (
        <>
          <div className='mb-6 flex gap-6'>
            <span>
              <Typography variant="lead">Data de prova: </Typography>
              <Chip value={
                <span className='flex items-center gap-2'>
                  <Calendar /> <p className='text-lg'>{formatDate(userExams.createdAt)}</p>
                </span>
              } size='lg' className='w-fit' color='green'/>
            </span>

            <span>
              <Typography variant="lead">Acertos: </Typography>
              <Chip value={
                <span className='flex items-center gap-2'>
                  <ListChecks /> <p className='text-lg'>{userExams.score} / 40</p>
                </span>
              } size='lg' className='w-fit' color='blue'/>
            </span>
          </div>

          <div className='flex flex-col gap-2' id="user-result-card">
            {userExams.questions.map((userQuestion, index) => (
              <>
                {!userQuestion ? (
                  <div>
                    carregando...
                  </div>
                ):(
                  <Card
                    key={index}
                    className={`flex flex-col rounded-md border border-border bg-modal-bg ${questionsToCancel.includes(userQuestion.questionId) ? 'border-[0.6rem] border-orange-600' : '' }`}
                  >
                    {questionsToCancel.includes(userQuestion.questionId) &&
                  <Chip value="questão anulada" className='absolute right-0 rounded-none rounded-bl-md bg-orange-600 text-[16px]'/>
                    }
                    <div className="flex w-full select-none items-center gap-4 bg-modal-heading p-4">
                      <div className='flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-white'>
                        <Typography className="font-bold" color="black">{index + 1}</Typography>
                      </div>
                      <Typography className="text-white" variant='h6'>
                        {userQuestion.title}
                      </Typography>
                    </div>

                    <div className="w-full items-center p-4">
                      <div className="select-none text-white" style={{ whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{ __html: userQuestion.statement }} />
                      <span className='flex  w-full items-center justify-center'>
                        <img src={userQuestion.image} className='my-2 max-h-[30rem] rounded-md'/>
                      </span>
                    </div>

                    {!questionsToCancel.includes(userQuestion.questionId) &&
                <div className='mb-8 flex w-full flex-col gap-4 px-4'>
                  <Card className={`flex w-full flex-row items-center gap-3 rounded-md border-2  px-2 py-3 text-white ${
                    String.fromCharCode(64 + userQuestion.position + 1) == decryptRightAnswer(userQuestion.rightAnswer) ? 'border-question-selected-100 bg-question-selected-200' : 'border-red-900 bg-red-600'
                  }`}>
                    <div className='flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-white'>
                      <p className='text-black'>{String.fromCharCode(64 + userQuestion.position + 1)}</p>
                    </div>
                    {userQuestion.alternatives && userQuestion.alternatives
                      .filter((alternative) => alternative.position === userQuestion.position)
                      .map((alternative, altIndex) => (
                        <div key={altIndex}>
                          {alternative.text}
                        </div>
                      ))}
                  </Card>

                  {String.fromCharCode(64 + userQuestion.position + 1) != decryptRightAnswer(userQuestion.rightAnswer) &&
                      <div className='rounded-md bg-white/40 p-2'>
                        <Typography variant="lead" className="mb-2 font-bold" color="white">Alternativa correta:</Typography>
                        <div className='flex w-full items-center gap-2 rounded-md border bg-modal-heading p-2 text-white'>
                          <div className='flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-white text-black'>
                            <p>{decryptRightAnswer(userQuestion.rightAnswer)}</p>
                          </div>
                          {userQuestion.alternatives && userQuestion.alternatives
                            .filter((alternative) => String.fromCharCode(64 + alternative.position + 1) == decryptRightAnswer(userQuestion.rightAnswer))
                            .map((alternative, altIndex) => (
                              <div key={altIndex}>
                                {alternative.text}
                              </div>
                            ))}
                        </div>
                      </div>
                  }
                </div>
                    }

                    {questionsToCancel.includes(userQuestion.questionId) &&
                  <div className='mb-8 flex w-full flex-col gap-4 px-4'>
                    {(userQuestion.alternatives || []).map((alternative, index) => (
                      <React.Fragment key={index}>
                        <Card className={'flex w-full flex-row items-center gap-3 rounded-md border-2  border-red-600 bg-red-500 px-2 py-3 text-white'}>
                          <div className='flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-white'>
                            <p className='text-black'>{String.fromCharCode(64 + userQuestion.position + 1)}</p>
                          </div>
                          {alternative.text}
                        </Card>
                      </React.Fragment>
                    ))}
                  </div>
                    }
                  </Card>
                )}

                <div className='my-2 flex h-fit w-full items-center gap-2'>
                  <div className=' h-[1px] w-full bg-gray-400' />
                  <Typography variant="h6" className="text-gray-500"> # </Typography>
                  <div className=' h-[1px] w-full bg-gray-400' />
                </div>
              </>
            ))}
          </div>
        </>
      )}

    </section>
  );
}

export default Result;

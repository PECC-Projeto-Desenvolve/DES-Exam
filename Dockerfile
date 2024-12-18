# Use uma imagem base de Node.js
FROM node:18-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie os arquivos de dependências
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install --legacy-peer-deps

# Copie o restante do código
COPY . .

# Execute o build da aplicação para produção
RUN npm run build

# Exponha a porta 5173 para a aplicação
EXPOSE 5173

# Inicie a aplicação em modo de produção
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]

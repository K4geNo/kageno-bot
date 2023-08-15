# Kageno Bot

O Discord Kageno Bot é um bot desenvolvido em TypeScript usando a biblioteca Discord.js na versão 14. Ele permite a criação de competições entre waifus e husbandos, proporcionando uma experiência interativa para os usuários do seu servidor do Discord.

## Funcionalidades

- Competição de Waifus: Os usuários podem criar competições entre waifus, onde os membros do servidor poderão votar na waifu que preferirem.
- Competição de Husbandos: Da mesma forma, os usuários podem criar competições entre husbandos para que os membros do servidor possam votar em seus husbandos favoritos.
- Contagem de Votos: O bot registra e contabiliza os votos recebidos por cada waifu e husbando durante as competições.
- Resultados das Competições: Após o término de uma competição, o bot exibe os resultados com base nos votos recebidos por cada waifu e husbando.

## Configuração

1. Certifique-se de ter o Node.js instalado em sua máquina.
2. Clone o repositório do Discord Kageno Bot: git clone `https://github.com/seu-usuario/discord-kageno-bot.git`.
3. Navegue até o diretório do projeto: `cd discord-kageno-bot`.
4. Instale as dependências usando o npm ou yarn: ``npm install`` ou ``yarn install``.
5. Configure o token do seu bot Discord:
   - Crie um arquivo chamado ``.env`` na raiz do projeto.
   - Adicione a seguinte linha ao arquivo ``.env``: ``DISCORD_TOKEN=seu_token_aqui``.
   - Substitua ``seu_token_aqui`` pelo token do seu bot Discord. Você pode obter um token criando um novo bot na [página de desenvolvedor do Discord](https://discord.com/developers/applications).
6. Execute o bot: ``npm start`` ou ``yarn start``.

Certifique-se de que o bot tenha as permissões adequadas no seu servidor do Discord para executar todas as funcionalidades corretamente.

## Comandos

O bot possui os seguintes comandos:

- `/waifu-league <campeonato> <waifuOne> <waifuTwo> <image>`: Cria uma nova competição entre waifus com o nome especificado.
- `/husbo-league <campeonato> <husboOne> <husboTwo> <image>`: Cria uma nova competição entre husbandos com o nome especificado.
!resultado: Exibe os resultados da competição atual.

## Contribuição

Se você gostaria de contribuir para o desenvolvimento do Discord Kageno Bot, sinta-se à vontade para enviar pull requests ou abrir issues no repositório do projeto. Todas as contribuições são bem-vindas!

------

## What is the best waifu? 👀
![](https://i.ytimg.com/vi/80aKXagaHVk/maxresdefault.jpg)

### Documentacao desatualizada!

# Info

Esse repo tem como intuito:

-   Disponibilizar uma maneira rapida de prototipar e criar bots completos
-   Ser uma base completa com todos os sistemas basicos esperados de um bot como:
    -   Indexação automatica de comandos novos sem ser necessario codigo novo
    -   Sistema de eventos modular e automatico
    -   Sistema de `!help` Automatico
    -   Sistema de permissoes por comando, permitindo:
        -   Permissoes basicas do discord
        -   Exclusividade por guild
        -   Exclusividade por usuario

# Como usar

Para usar esse template como base para um bot:

-   Crie um `fork` ou de `git clone` no repositorio
-   Ajuste os detalhes como nome, autor e repositorio em arquivos como `package.json`
-   Crie um arquivo `.env` com uma variavel `TOKEN = SEU_BOT_TOKEN_DO_DISCORD`
-   Use `npm start` para iniciar o bot

# Comandos

Para criar um comando novo, utilize como base o `templateCommand.js` como base e crie um arquivo na pasta comandos com o nome principal do comando

Todo comando tem uma quantidade de metadata que pode ser atribuida a ele:

|    Nome     | Necessario |   Value    |                                                        Descricao                                                         |               Exemplo               |
| :---------: | :--------: | :--------: | :----------------------------------------------------------------------------------------------------------------------: | :---------------------------------: |
|    name     |   `sim`    |  `string`  |                                                     Nome do comando                                                      |            `name: help`             |
| description |   `sim`    |  `string`  |                                             Descricao do comando para !help                                              |   `description: 'comando basico'`   |
|   aliases   |   `nao`    | `string[]` |                                               Alternativas para o comando                                                | `aliases: ['template', 'templote']` |
|    usage    |   `nao`    |  `string`  |                                              Como o comando deve ser usado                                               |        `usage: play [link]`         |
|  cooldown   |   `nao`    |  `number`  |                                                   Cooldown do comando                                                    |            `cooldown: 5`            |
| permission  |   `nao`    |  `number`  | [Permission integer](https://discordapi.com/permissions.html) indicando as permissoes necessarias para usar esse comando |         `permission: 8192`          |
|     ids     |   `nao`    | `string[]` |                                       IDs dos usuarios que podem usar esse comando                                       |    `ids: ['181270590672338944']`    |
|  hideHelp   |   `nao`    | `boolean`  |                                         Se o comando deve ser escondido do !help                                         |          `hideHelp: true`           |

# Eventos

Para adicionar mais eventos ao `Event Handler`, use como base o `templateEvent.js` e crie um arquivo na pasta events com o nome exato do [evento](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-channelCreate)

# Comandos padrao do bot

Todos esses comandos podem ser deletados como voce achar valido, nenhum deles é necessario para o funcionamento do bot.

| Comando | Uso                                                                              |
| ------- | -------------------------------------------------------------------------------- |
| help    | Lista todos os comandos do bot de forma automática                               |
| invite  | Gera um link para convidar o bot para um servidor                                |
| ping    | Testa o delay entre o bot receber uma mensagem e responder                       |
| reload  | Recarrega os comandos do bot. Util para usar durante desenvolvimento             |
| roll    | Escolhe um numero de 1 a 100                                                     |
| spam    | Entra e sai de um canal de voz 10 vezes                                          |
| stats   | Mostra a quantidade de servidores em que o bot esta e o numero de usuarios total |

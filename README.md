# Desafio G — Clone da Home do Google

> *Recriar a home do Google com HTML e CSS na unha, usando só 10 cores e 10 ícones*

## Sobre o Desafio

Este repositório contém o desafio de recriar a **home do Google** do zero, sem framework e sem biblioteca — só HTML e CSS.

A pegadinha é a restrição: você tem **10 cores** e **10 ícones** numerados, e nada além disso. Nenhum hex novo, nenhum SVG de fora. Tudo que a página precisa tem que sair dessa caixa de ferramentas.

O enunciado é simples de ler e chato de acertar: o que separa um clone bom de um clone ruim aqui é espaçamento, alinhamento e proporção.

## O Que Construir

Uma página que:
- Reproduza a home do Google: logo colorido, campo de busca e ícones
- Use apenas as cores `var(--cor-1)` a `var(--cor-10)`
- Use apenas os ícones `assets/icones/icone-01.svg` a `icone-10.svg`
- Fique centralizada e se comporte bem em telas diferentes

## Critérios de Avaliação

- Fidelidade visual em relação à home do Google
- Uso correto das cores nas letras do logo
- Escolha coerente dos ícones para cada elemento
- Layout centralizado e responsivo
- CSS limpo, sem gambiarra e sem `!important` desnecessário

## 🚨 A Regra do PR de UMA LINHA

**Como eu falei no vídeo:** a contribuição aqui é um **Pull Request que altera UMA ÚNICA LINHA de código**. Uma. Só uma.

A ideia é que o clone vá melhorando aos poucos, **uma linha por pessoa**, e dê pra ver no histórico do repositório um layout quebrado virando a home do Google.

- ✅ 1 linha alterada, adicionada ou removida no `index.html`
- ✅ O título do PR explica o que aquela linha resolve
- ❌ Nada de refatorar o arquivo inteiro
- ❌ Nada de "aproveitei e arrumei mais umas coisinhas"

Se o `git diff` do seu PR mostrar mais de uma linha de código, ele volta. 🙂

## Participe Você Também!

**Acha que sabe qual é a linha que falta?** Bora ver! 🔍

### Como Contribuir

1. **Fork** este repositório
2. Crie uma branch com um nome que descreva a linha (`fix/centralizar-input`)
3. Altere **uma linha** do código
4. Rode `npm run dev` e confirme que melhorou de verdade
5. Abra um **Pull Request** explicando o porquê daquela linha

### Template do Pull Request

Seu PR deve incluir:
- **A linha**: o antes e o depois
- **O problema**: o que estava quebrado
- **O porquê**: por que essa é a correção certa
- **Antes/Depois**: screenshot, se der

### Regras para Contribuição

- ✅ Uma linha de código por PR
- ✅ Mantenha as variáveis de cor (`var(--cor-N)`) e os ícones existentes
- ✅ HTML e CSS puros — nada de dependência nova
- ❌ Nada de código malicioso

### Ideias do Que Consertar

- 🎯 O `!important` desnecessário no `header`
- 🩹 O `outline: 1px solid #000000` sem ponto e vírgula
- 📏 O `width: 200px` que ficou órfão dentro do `.input`
- 🎨 O `span:nth-child(5)` pintando o "l" de laranja
- 🧭 O `body` com `height: 100%` que não centraliza nada
- 🔤 A fonte que ainda é a padrão do navegador

## 📁 Estrutura do Repositório

```
/
├── index.html            # 👈 O clone (é aqui que sua linha entra)
├── referencia.html       # Folha visual com as cores e os ícones numerados
├── dev-server.mjs        # Servidor local com livereload, sem dependências
├── package.json
├── assets/
│   └── icones/
│       ├── icone-01.svg
│       ├── ...
│       └── icone-10.svg
└── README.md
```

## Paleta

| # | Cor | Hex |
|---|---|---|
| 1 | Verde | `#34a853` |
| 2 | Preto | `#202124` |
| 3 | Vermelho | `#ea4335` |
| 4 | Laranja | `#ff6d00` |
| 5 | Azul | `#4285f4` |
| 6 | Cinza claro | `#dfe1e5` |
| 7 | Amarelo | `#fbbc05` |
| 8 | Roxo | `#7b1fa2` |
| 9 | Cinza médio | `#70757a` |
| 10 | Quase branco | `#f2f2f2` |

No CSS a cor sai como `var(--cor-5)`. No HTML o ícone sai como `assets/icones/icone-05.svg`.

Para ver as cores e os ícones lado a lado, abra `referencia.html` no navegador.

## Como Executar

Só precisa do Node instalado. Sem `npm install`, sem dependências:

```bash
npm run dev
# http://localhost:3000
```

O servidor tem livereload embutido: salvou o arquivo, a página atualiza sozinha.

## 📄 Licença

Este projeto está sob licença MIT. Sinta-se livre para explorar, aprender e compartilhar!

---

*Feito com HTML, CSS e 10 cores*

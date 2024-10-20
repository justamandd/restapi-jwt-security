# Motivação

O desenvolvimento deste projeto tem como objetivo o aprendizado de novas habilidades, tais como autenticação com JWT, aplicação de conceitos de SOLID e prática de TDD.

# O Projeto

## Tema

Este projeto consiste no desenvolvimento de uma API para gerenciamento de uma carteira de ganhos e gastos.

## Proposta do Sistema

A API desenvolvida para a carteira de ganhos e gastos tem como principal objetivo proporcionar um ambiente seguro e confiável para o gerenciamento de finanças pessoais. Sendo um sistema voltado para a manipulação de informações sensíveis, como dados de receitas e despesas dos usuários, a segurança é o aspecto central de sua concepção.

## Tecnologia utilizadas

- Node
- Typescript
- Express
- Criptografia (bcrypt)
- Proteção conta SQL injection (express-validator)
- Proteção contra DDOS (express-rate-limit)
- Bloqueio de Login por falhas repetitivas
- Segurança de Sessão (HttpOnly & Secure)
- SOLID
- TDD (Jest)
- MySQL
- Prisma ORM

## Banco de Dados

![Modelagem Banco de Dados](/src/assets/diagrama_logico.png)
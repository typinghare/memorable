# Development

## Environment
~~~bash
# PNPM is an efficient package manager that surpasses NPM; we are going to use it to install packages
pnpm --version
~~~

## Dependencies
~~~bash
# NodeJS
pnpm add @types/node

# Inquirer.js is a powerful and widely used package for creating interactive terminal interfaces
pnpm add inquirer @types/inquirer

# Chalk is a package for styling and coloring text in the terminal
pnpm add chalk@4.1.2

# Ora is a package for creating loading spinners and progress bars in the terminal.
pnpm add ora

# Boxen is a package for creating boxes and borders around text in the terminal.
pnpm add boxen

# MomentJS
pnpm add moment
~~~

~~~bash
# ts-jest
pnpm add -D ts-jest @types/jest
npx ts-jest config:init
~~~
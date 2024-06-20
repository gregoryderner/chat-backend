module.exports = {
  // Ambiente de teste configurado para Node.js
  testEnvironment: 'node',
  // Diretório para armazenar relatórios de cobertura de teste
  coverageDirectory: './coverage',
  // Ignorar os diretórios listados durante a execução dos testes
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  // Arquivos de configuração a serem executados antes de cada teste
  setupFilesAfterEnv: ['./jest.setup.js']
};

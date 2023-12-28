import puppeteer  from 'puppeteer';
import cheerio  from 'cheerio';
import fs  from 'fs';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Substitua a URL abaixo pela URL do marketplace que você deseja coletar dados.
  const url = 'https://www.mercadolivre.com.br/ofertas';

  await page.goto(url);

  // Aguarde a página carregar completamente ou implemente sua própria lógica de espera.

  // Use o Cheerio para analisar o conteúdo da página.
  const content = await page.content();
  const $ = cheerio.load(content);

  const products = [];

  // Substitua os seletores abaixo pelos seletores corretos para o seu caso.
  $('div.promotion-item__container').each((index, element) => {
    const name = $(element).find('p.promotion-item__title').text();
    const price = $(element).find('span.product-price').text();
    const link = $(element).find('a.product-link').attr('href');

    products.push({ name, price, link });
  });

  // Feche o navegador.
  await browser.close();

  // Exporte os dados para um arquivo CSV.
  const csvData = products.map(product => `${product.name},${product.price},${product.link}`).join('\n');
  fs.writeFileSync('produtos.csv', 'Nome,Preço,Link\n' + csvData, 'utf-8');

  console.log('Dados exportados para produtos.csv');
})();

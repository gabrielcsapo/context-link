const { name, description } = require('./package.json');

module.exports = {
  title: name,
  description: description,
  nav: {
    Source: 'https://github.com/gabrielcsapo/context-link',
    Docs: './code/index.html'
  },
  body: [{
    type: 'code',
    title: 'Find',
    subtitle: 'Finding the given text in the given arrays',
    value: `
var ContextLink = require('context-link');
var entries = [
	'I walked down alone Sunday after church   To the place where John has been cutting treesTo see for myself about the birch up   He said I could have to bush my peas.',
	'The sun in the new-cut narrow gap   Was hot enough for the first of May,And stifling hot with the odor of sap   From stumps still bleeding their life away.',
	'The frogs that were peeping a thousand shrill   Wherever the ground was low and wet,The minute they heard my step went still   To watch me and see what I came to get.',
	'Birch boughs enough piled everywhere!—   All fresh and sound from the recent axe.Time someone came with cart and pair   And got them off the wild flower’s backs.',
	'They might be good for garden things   To curl a little finger round,The same as you seize cat’s-cradle strings,   And lift themselves up off the ground.',
	'Small good to anything growing wild,   They were crooking many a trilliumThat had budded before the boughs were piled   And since it was coming up had to come.'
];
var context = new ContextLink(entries);

var found = context.find('the');
var entriesExpanded = entries.map((e) => e.split(' '));

found['the'].forEach((entry, i) => {
  entriesExpanded[entry.index][entry.position] = \`<b>\${entry.entry.data}<sup>\${i}</sup></b>\`;
});
console.html(\`<ul>\${entriesExpanded.map((p) => \`<li>\${p.join(' ')}</li>\`).join('')}</ul>\`);
    `
  }],
  footer: `
    <div class="text-black">Made with ☕️ by <a href="http://www.gabrielcsapo.com">@gabrielcsapo</a></div>
  `,
  output: './docs',
  externals: [
    './dist/context-link.min.js'
  ]
};

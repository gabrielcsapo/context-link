const test = require('tape');

const ContextLink = require('../index');

test('context-link', (t) => {
	t.plan(3);

	t.test('should be able to initalize correctly', (t) => {
		var context = new ContextLink([
			'hello world',
			'hello saturn',
			'hello pluto'
		]);
		t.equal(context.trees.length, 3);
		t.end();
	});

	t.test('should be able to find word in given contexts', (t) => {
		var context = new ContextLink([
			'hello world',
			'hello saturn',
			'hello pluto'
		]);
		t.equal(context.trees.length, 3);
		var found = context.find('hello');

		t.equal(found['hello'].length, 3);
		t.equal(found['hello'][0].index, 0);
		t.equal(found['hello'][0].position, 0);
		t.equal(found['hello'][1].index, 1);
		t.equal(found['hello'][1].position, 0);
		t.equal(found['hello'][2].index, 2);
		t.equal(found['hello'][2].position, 0);

		t.end();
	});

	t.test('should be able to identify multiple hits for word if it exists', (t) => {
		const context = new ContextLink([
			'I walked down alone Sunday after church   To the place where John has been cutting treesTo see for myself about the birch up   He said I could have to bush my peas.',
			'The sun in the new-cut narrow gap   Was hot enough for the first of May,And stifling hot with the odor of sap   From stumps still bleeding their life away.',
			'The frogs that were peeping a thousand shrill   Wherever the ground was low and wet,The minute they heard my step went still   To watch me and see what I came to get.',
			'Birch boughs enough piled everywhere!—   All fresh and sound from the recent axe.Time someone came with cart and pair   And got them off the wild flower’s backs.',
			'They might be good for garden things   To curl a little finger round,The same as you seize cat’s-cradle strings,   And lift themselves up off the ground.',
			'Small good to anything growing wild,   They were crooking many a trilliumThat had budded before the boughs were piled   And since it was coming up had to come.'
		]);

		var found = context.find('the');

		t.equal(found['the'].length, 10);
		t.equal(found['the'][0].index, 0);
		t.equal(found['the'][0].position, 10);
		t.equal(found['the'][1].index, 0);
		t.equal(found['the'][1].position, 22);

		t.equal(found['the'][2].index, 1);
		t.equal(found['the'][2].position, 3);
		t.equal(found['the'][3].index, 1);
		t.equal(found['the'][3].position, 13);
		t.equal(found['the'][4].index, 1);
		t.equal(found['the'][4].position, 20);

		t.equal(found['the'][5].index, 2);
		t.equal(found['the'][5].position, 11);

		t.equal(found['the'][6].index, 3);
		t.equal(found['the'][6].position, 12);
		t.equal(found['the'][7].index, 3);
		t.equal(found['the'][7].position, 27);

		t.equal(found['the'][8].index, 4);
		t.equal(found['the'][8].position, 28);

		t.equal(found['the'][9].index, 5);
		t.equal(found['the'][9].position, 17);

		t.end();
	});
});

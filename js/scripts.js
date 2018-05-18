let structure = {};

function onChange(event) {
	let id = event.id;
    structure[id] = event.value;
}

function selectAndCopy(event) {
	// event.preventDefault();

	let generated = document.getElementById('html-output');
	generated.select();
	document.execCommand('copy');
}

function onUpdate(event) {
	event.preventDefault();

	let related = structure['related'] ? (`&lt;span class="dl"&gt;Related videos:&lt;/span&gt;
&lt;ul class="dl-list"&gt;
 	&lt;li&gt;&lt;a href="` + structure['related'] + `"&gt;` + structure['relatedname'] + `&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;`) : '';

	let download = structure['download'] ? (`&lt;span class="dl"&gt;Download content here:&lt;/span&gt;
&lt;ul class="dl-list"&gt;
 	&lt;li&gt;&lt;a href="` + structure['download'] + `"&gt;` + structure['downloadname'] + `&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;`) : '';

	let author = structure['authorlink'] ? (`&lt;li&gt;Author: &lt;a href="`+ structure['authorlink'] +`"&gt;` + structure['author'] + `&lt;/a&gt;&lt;/li&gt;`) : 
	('&lt;li&gt;Author: &lt;span&gt;' + structure['author'] + '&lt;/span&gt;&lt;/li&gt;');

	let photo = structure['photos'] ? (`&lt;li&gt;Photos: &lt;a href="` + structure['photos'] + `"&gt;` + structure['photos'] + `&lt;/a&gt;&lt;/li&gt;`) : '';

	let sponsor = structure['sponsor'] ? (`&lt;li&gt;Sponsor: 
&lt;a href="` + structure['sponsorsite'] + `"&gt;&lt;img src="` + structure['sponsor'] + `" alt="" width="300" height="164" class="alignnone size-medium wp-image-7105" /&gt;&lt;/a&gt;
        &lt;/li&gt;`) : '';

	let submit = `&lt;div class="parent"&gt;
&lt;div class="left-side"&gt;
&lt;div class="left-head"&gt;More by ` + structure['more'] + `&lt;/div&gt;
[display-posts author="` + structure['morecode'] + `" posts_per_page="5" category="Blog"]

&lt;/div&gt;
&lt;div class="middle"&gt;&lt;span class="contributors"&gt;Contributor: &lt;/span&gt;&lt;a href="/contributor/` + structure['contributorid'] + `/"&gt;`
+ structure['contributor'] + `&lt;/a&gt;` + `&lt;br/&gt;` + `&lt;br/&gt;`
+ structure['content'] + `&lt;br/&gt;` + related + download + `
&lt;/div&gt;
&lt;div class="right-side"&gt;
&lt;ul&gt;
 	` + author + `
 	&lt;li&gt;Editor: ` + structure['editor'] + `&lt;/li&gt;
 	&lt;li&gt;Graphics Design: ` + structure['designer'] + `&lt;/li&gt;
 	` + photo + sponsor + `
&lt;/ul&gt;
&lt;/div&gt;
&lt;/div&gt;`;

	document.getElementById('html-output').innerHTML = submit;
}

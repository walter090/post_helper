let structure = {};

function onChange(event) {
	let id = event.id;
    structure[id] = event.value;
}

function onSwitch(event) {
	event.preventDefault();

	let id = '#' + event.target.id;

	if (!$(id).hasClass('active')) {
		cleanSlate();
		$(id).addClass('active');
		$(id).siblings().removeClass('active');

		let associated = '#' + $(id).attr('for');
		$(associated).removeClass('inactive');
		$(associated).siblings('.form-wrap').addClass('inactive');
	}
}

function cleanSlate() {
	let fields = document.getElementsByTagName('input');
	let areas = document.getElementsByTagName('textarea');

	fields = Array.from(fields);
	areas = Array.from(areas);

	fields.map(field => {
		field.value = '';
	});
	areas.map(area => {
		area.value = '';
	});

	structure = {};
}

function onClear(event) {
	event.preventDefault();
	cleanSlate();
}

function selectAndCopy(event) {
	// event.preventDefault();

	let generated = document.getElementById('html-output');
	generated.select();
	document.execCommand('copy');
}

function onUpdateContrib(event) {
	event.preventDefault();

	let submit = `
<div id="member">
	<div id="intro">
		` + structure['contrib-intro'] + `
	</div>
</div>
<div id="related">
	<div id="contrib-list">
		<div id="contribution">Contributions</div>
			[display-posts tag="` + structure['contrib-contrib'] + `]
		</div>
</div>
	`;
	document.getElementById('html-output').value = submit;
}

function onUpdate(event) {
	event.preventDefault();

	let related = structure['related'] ? (`<span class="dl">Related videos:</span>
<ul class="dl-list">
 	<li><a href="` + structure['related'] + `">` + structure['relatedname'] + `</a></li>
</ul>`) : '';

	let download = structure['download'] ? (`<span class="dl">Resources:</span>
<ul class="dl-list">
 	<li><a href="` + structure['download'] + `">` + structure['downloadname'] + `</a></li>
</ul>`) : '';

	let author = structure['authorlink'] ? (`<li>Author: <a href="`+ structure['authorlink'] +`">` + structure['author'] + `</a></li>`) : 
	('<li>Author: <span>' + structure['author'] + '</span></li>');

	let editor = structure['editorlink'] ? (`<li>Editor: <a href="`+ structure['editorlink'] +`">` + structure['editor'] + `</a></li>`) : 
	('<li>Editor: <span>' + structure['editor'] + '</span></li>');

	let photo = structure['photos'] ? (`<li>Photos: <a href="` + structure['photoslink'] + `">` + structure['photos'] + `</a></li>`) : '';

	let sponsor = structure['sponsor'] ? (`<li>Sponsor: 
<a href="` + structure['sponsorsite'] + `"><img src="` + structure['sponsor'] + `" alt="" width="300" height="164" class="alignnone size-medium wp-image-7105" /></a>
        </li>`) : '';

	let embed = structure['embed'] ? (`[embedyt]` + structure['embed'] + `[/embedyt]`) : '';

	let designer = structure['designer'] ? (`<li>Graphics Design: ` + structure['designer'] + `</li>`) : ''

	let submit = `<div class="parent">
<div class="left-side">
<div class="left-head">More by ` + structure['more'] + `</div>
[display-posts tag="` + structure['morecode'] + `" posts_per_page="5"]

</div>
<div class="middle"><span class="contributors">Contributor: </span><a href="/contributor/` + structure['contributorid'] + `/">`
+ structure['contributor'] + `</a>` + `<br/>` + `<br/>`
+ structure['content'] + `<br/>` + embed + `<br/>` + related + download + `
</div>
<div class="right-side">
<ul>
 	` + author + `
 	` + editor + `
 	` + designer + `
 	` + photo + `
 	` + sponsor + `
</ul>
</div>
</div>`;

	document.getElementById('html-output').value = submit;
	document.body.scrollTop = document.documentElement.scrollTop = 0;
}

<h2>Typewriter: an easy to use and jQuery-free Angular 1.x directive</h2>

This is just a graphical effect of someone typing sentences on your page.
This directive allow you to pass a string or an array of strings in the "sentences" attribute (behavior is explained later).
Since is restricted to attributes, it can be applied to any (empty) tag you want.
Is slightly configurable through some attributes:

* [boolean] randomize: define if the sentence to type has to be defined randomly or following the array sequence
* [integer - ms] type-delay: specifies the delay between each letter
* [integer - ms] erase-delay: specifies the delay between the tipyng of the last letter and the beginning of the canceling
* [integer - ms] initial-delay: specifies the delay between the page loading and the beginning of typing

Installation: import typewriter.js and typewriter.css in your project and add "phox.typewriter" module to your angular module dependencies
<h3>That's it! Now go on to see the effect behavior with some example (I think is better for you if you watch the demo in the repo instead)</h3>
Basic usage: passing an array of sentences

`<div typewriter sentences="sequence"></div>`


If you pass a string, that will be typed just one time and de cursor will be removed at the end

`<div typewriter sentences="single_sentence"></div>`


You can ask to randomize the sentences in the array to let the user display a new sentence at each page reload

`<div typewriter sentences="sentences" randomize="true"></div>`


You can ask to type faster, specifing a type delay lower than the default one (150ms)

`<div typewriter sentences="sentences" type-delay="50"></div>`


You can ask to type slower, specifing a type delay higher than the default one (150ms)

`<div typewriter sentences="sentences" type-delay="300"></div>`
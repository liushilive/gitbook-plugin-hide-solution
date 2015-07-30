gitbook-plugin-sectionx
===

This is GitBook plugin created for you to separate the page into sections, and add buttons to allow readers to control the visibility of each section.

## Example

You can see it at work here: [Click here](http://ymcatar.gitbooks.io/gitbook-test/content/testing_sectionx.html)

Please note that this plugin is experimental. Although it is working at the moment, but the syntax or others are still subjected to change.

## Changelog

* 0.6 Releases:
	* **0.6.4:** Fixed not working section button.
	* **0.6.3:** Even more simplified code, updated README.
	* **0.6.2:** Simplified code.
	* **0.6.1:** Added more detailed error message.
	* **0.6.0:** Added syntax checking while the book is being built. Common syntax error and invalid ID will be detected.

* 0.5 Releases:
	* **0.5.3:** Updated README, as I forgot to update the syntax.
	* **0.5.2:** Improved dark theme appearance.
	* **0.5.1:** Quick bugfix.
	* **0.5.0:** Performance improvement (section rendering now moved to backend).

* 0.4 Releases:
	* **0.4.4:** Fixed section title button behaviour to allow better integration with other plugins.
	* **0.4.3:** Improved dark theme appearance.
	* **0.4.2:** Improved dark theme support.
	* **0.4.1:** A section toggle button will be displayed if the section has been toggled once.
	* **0.4.0:** Added a function for you to control toggling of sections in other plugins ```sectionxToggle(id of the target section to be toggled)```.

* 0.3 Releases:
	* **0.3.3:** Fixed panel toggle button.
	* **0.3.2:** Fixed issues with ```<h2>``` title.
	* **0.3.1:** Fixed typos in README.
	* **0.3.0:** Fixed rendering issue in .pdf or other formats.

* 0.2 Releases:
	* **0.2.1:** Updated README to reflect the new syntax.
	* **0.2.0:** Huge update! Changed syntax for defining section so that you can add blocks (GitBook plugin) within section.

* 0.1 Releases:
	* **0.1.1:** Improved looks of dark theme.
	* **0.1.0:** Fixed color scheme when changed into dark mode.

## How to use section?

### Defining new section

You can define a new section with the use of tag:

```
<!--sec data-title="Introduction" data-id="section0" data-show=true ces-->

Insert markdown content here (you should start with h3 if you use heading).

<!--endsec-->
```

A section will take three arguments, listed as follows:

* **data-title:** the title of the section, it will appear as the title of the bootstrap panel (with size of h2).
	* Please note that you cannot use the character ```"``` in the title, please use ```&quot;``` instead.
* **data-id:** the id of the section, it is useful for button control (discussed in next section).
* **data-show:** a boolean value denoting by default, whether or not the panel content will be visible.
	* **true:** the panel content is visible to user by default, the panel title will be clickable.
	* **false:** the panel content is hidden to user by default, the panel title is not clickable and can only be viewed by adding a custom button (discussed in next section).

### Using a button to control section visibility

By adding inline HTML in the GitBook, the following code can add a button to allow you to view or hide other sections. Here are the explanation of each tags:

```
<button class="section" target="section1" show="Show next section" hide="Hide next section"></button>
```

* **class:** the button has to belong to the class "section".
* **target:** when pressed, the section with the id of target will be toggled.
* **show:** the text on the button when the target section is hidden.
* **hide:** the text on the button when the target section is visible.

Note that you can leave 'show' and 'hide' undefined, in this case, an up-arrow or down-arrow will be displayed instead. The button will not be outputed if exported to .pdf or other formats.

### Integration with other plugin

Such integration is used in my other plugin ```gitbook-plugin-mcqx``` (see [here](https://github.com/ymcatar/gitbook-plugin-mcqx), or check out the next page of this book). The next section will be toggled when the user answer a question correctly.

If you are developing for other plugin, you can use the ```sectionToggle(id)``` function in the client side javascript, for example:

```
if(typeof sectionToggle === "function") //check if sectionx plugin is used
	sectionToggle(target); //target is the id of the section to be toggled.
```

### Known issue

During book building, the following error message can be seen:
```
warn: hook 'page' used by plugin 'gitbook-plugin-sectionx' is deprecated, and will be removed in the coming versions
```
This message can be safely ignored.

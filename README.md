gitbook-plugin-sectionx
===

This is GitBook plugin created for you to separate the page into sections, and add buttons to allow readers to control the visibility of each section.

## Example

You can see it at work here: [Click here](http://ymcatar.gitbooks.io/gitbook-test/content/testing_sectionx.html)

## Changelog

* **0.3.1:** Fixed typos in README.
* **0.3.0:** Fixed rendering issue in .pdf or other formats.
* **0.2.1:** Updated README to reflect the new syntax.
* **0.2.0:** Huge update! Changed syntax for defining section so that you can add blocks (GitBook plugin) within section.
* **0.1.1:** Improved looks of dark theme.
* **0.1.0:** Fixed color scheme when changed into dark mode.

## How to use section?

### Defining new section

You can define a new section with the use of tag:

```
<!--sec title="This is the first section", id="section0", show=true ces-->

Insert markdown content here.

<!--endsec-->
```

A section will take three arguments, listed as follows:

* **title:** the title of the section, it will appear as the title of the bootstrap panel (with size of h2).
* **id:** the id of the section, it is useful for button control (discussed in next section).
* **show:** a boolean value denoting by default, whether or not the panel content will be visible.
	* **true:** the panel content is visible to user by default, the panel title will be clickable.
	* **false:** the panel content is hidden to user by default, the panel title is not clickable and can only be viewed by adding a custom button (discussed in next section).

## Using a button to control section visibility

### Controling the flow with buttons

By adding inline HTML in the GitBook, the following code can add a button to allow you to view or hide other sections. Here are the explanation of each tags:

* **class:** the button has to belong to the class "section".
* **target:** when pressed, the section with the id of target will be toggled.
* **show:** the text on the button when the target section is hidden.
* **hide:** the text on the button when the target section is visible.

Note that you can leave 'show' and 'hide' undefined, in this case, an up-arrow or down-arrow will be displayed instead.

For example:

```
<button class="section" target="section1" show="Show next section" hide="Hide next section"></button>
```

Note that the button will not be outputed if exported to .pdf or other formats.
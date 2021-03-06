# jQuery Back to Last Point

A jQuery Plugin that allows you to get back to the last point viewed (based on scroll position) just before an internal link is clicked.

## How it Works

When clicked, an internal link jump to its named anchor.
This plugin get the position just before this click, so allows you to go back to the exactly point you was when you clicked on the link, basically.

It can be useful, so!

## Usage

To 'get back' you need a "Get Back to Last Point" button. For it:

````
$(".get-back").backToLastPoint({
	justAnchors: true
});
````

The plugin will automatically recognize when an internal link is clicked, so, just click on "Get Back" button to go back to the last position!

The generated output have no styles.

You can change the scroll duration (default is 400 ms):
````
$(".get-back").backToLastPoint({
	justAnchors: true,
	scrollDuration: 400
});
````

## Contributing

Feel free to contribute :)

## License

jQuery Back to Last Point is free to use under MIT License.

## Changelog

v1.0 - Feb 02, 2015
- Initial release.

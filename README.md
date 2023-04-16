<h1 align="center">Diff & Compare</h1>

<p align="center">Super simple app for comparing minified (and potentially escaped) HTML, CSS, and JS/JSON strings</p>

## Background

Working on [preact-cli](https://github.com/preactjs/preact-cli)'s upgrade to v4, I was losing my mind running into Jest test failures providing diffs like the following:

<div align="center">
    <img
       alt="Terminal output of a test failure. Shows two minifed strings that are 6 lines in length, wrapped, and have escapes throughout. Impossible to find the difference by glance alone."
       src="https://github.com/rschristian/diff-compare/blob/master/media/jest-diff.png?raw=true"
     />
</div>

<br>

Unformatted, with escapes all over the place, and color coding that was frankly not helpful.

Comparing 6+ lines of wrapped text is quite difficult, so I took to copying each string into a formatter, and then copying to a text comparison tool ([text-compare](https://text-compare.com) was my preferred tool, and this certainly takes a few hints for the design). This was slow, no formatter would remove the backslashes (which were just noise), and that diff tool, while the best I found, did two-way diffing which I really didn't need.

This has saved me a ton of time already, hopefully it can be useful for someone else too.

## Usage

Simply navigate to [https://diff-compare.rschristian.dev/](https://diff-compare.rschristian.dev/) and enter expected text in the left field and recieved in the right. You can set file type with the tabs above the expected input field.

Both entries are stored in localStorage so feel free to refresh the page or navigate away. Your entries will remain.

Any backslash found in either string will be removed. This was essential for me due to Jest/the matchers returning strings with escapes that were never relevant.

## License

[MIT](https://github.com/rschristian/diff-compare/blob/master/LICENSE)

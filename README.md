[![npm](https://img.shields.io/npm/v/rebem-test-utils.svg?style=flat-square)](https://www.npmjs.com/package/rebem-test-utils)
[![travis](http://img.shields.io/travis/rebem/test-utils.svg?style=flat-square)](https://travis-ci.org/rebem/test-utils)
[![coverage](https://img.shields.io/codecov/c/github/rebem/test-utils.svg?style=flat-square)](https://codecov.io/github/rebem/test-utils)
[![deps](https://img.shields.io/gemnasium/rebem/test-utils.svg?style=flat-square)](https://gemnasium.com/rebem/test-utils)

[reBEM](https://github.com/rebem/rebem) addons for [React Test Utilities](https://facebook.github.io/react/docs/test-utils.html).

## Install

```
npm i -D rebem-test-utils
```

## Overview

In addition to usual `react-addons-test-utils` helpers there are few new which lets you search for components by [BEM PropTypes](https://github.com/rebem/rebem#bem-proptypes):

* `block`
* `elem`
* `mods`
* `mix`
* `tag`

### `scryRenderedDOMComponentsWithBEM(tree, bem)`

```js
import { BEM } from 'rebem';
import TestUtils from 'rebem-test-utils';

const tree = reBEMTestUtils.renderIntoDocument(
    BEM({ block: 'block' },
        BEM({ block: 'block', elem: 'elem' }),
        BEM({ block: 'block', elem: 'elem' })
    )
);

const elems = TestUtils.scryRenderedDOMComponentsWithBEM(tree, { block: 'block', elem: 'elem' });

console.log(elems.length);
// 2

console.log(
    elems.every(elem => TestUtils.isDOMComponent(elem))
);
// true
```

### `findRenderedDOMComponentWithBEM(tree, bem)`

```js
import { BEM } from 'rebem';
import TestUtils from 'rebem-test-utils';

const tree = reBEMTestUtils.renderIntoDocument(
    BEM({ block: 'block' },
        BEM({ block: 'block', elem: 'elem' })
    )
);

const elem = TestUtils.findRenderedDOMComponentWithBEM(tree, { block: 'block', elem: 'elem' });

console.log(
    TestUtils.isDOMComponent(elem)
);
// true
```

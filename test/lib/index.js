import React from 'react';
import assert from 'assert';

import reBEMTestUtils from '../../lib/';

const props = {
    block: 'block',
    elem: 'elem',
    mods: {
        mod: 'val'
    },
    mix: [
        {
            block: 'block2',
            elem: 'elem2'
        }
    ],
    tag: 'span'
};
const bemjson = {
    block: 'block',
    elem: 'elem',
    mods: {
        mod: 'val'
    },
    mix: [
        {
            block: 'block2',
            elem: 'elem2'
        }
    ],
    tag: 'span'
};

class TestSingle extends React.Component {
    render() {
        return React.createElement(
            'div',
            null,
            React.createElement('div', props)
        );
    }
}

class TestMultiple extends React.Component {
    render() {
        return React.createElement(
            'div',
            null,
            React.createElement('div', props),
            React.createElement('div', props)
        );
    }
}

describe('reBEMTestUtils', function() {
    it('scryRenderedDOMComponentsWithBEM', function() {
        const root = reBEMTestUtils.renderIntoDocument(
            React.createElement(TestMultiple)
        );

        const result = reBEMTestUtils.scryRenderedDOMComponentsWithBEM(root, bemjson);

        assert.equal(result.length, 2);
    });

    describe('findRenderedDOMComponentWithBEM', function() {
        it('simple', function() {
            const root = reBEMTestUtils.renderIntoDocument(
                React.createElement(TestSingle)
            );

            const result = reBEMTestUtils.findRenderedDOMComponentWithBEM(root, bemjson);

            assert.ok(reBEMTestUtils.isDOMComponent(result));
        });

        it('"Did not find exactly one match"', function() {
            const msg = 'Did not find exactly one match (found: 2) for bemjson:';
            const root = reBEMTestUtils.renderIntoDocument(
                React.createElement(TestMultiple)
            );

            assert.throws(
                function() {
                    reBEMTestUtils.findRenderedDOMComponentWithBEM(root, bemjson);
                },
                function(error) {
                    if (error.message.indexOf(msg) === 0) {
                        return true;
                    }
                }
            );
        });
    });
});

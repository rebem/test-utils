import React from 'react';
import { BEM } from 'rebem';
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
const bemjson = { ...props };

class TestSingle extends React.Component {
    render() {
        return React.createElement(
            'div',
            null,
            BEM(props)
        );
    }
}

class TestMultiple extends React.Component {
    render() {
        return React.createElement(
            'div',
            null,
            BEM(props),
            BEM(props)
        );
    }
}

describe('reBEMTestUtils', function() {
    describe('isCompositeComponentWithBEM', function() {
        it('is function', function() {
            assert.ok(
                typeof reBEMTestUtils.isCompositeComponentWithBEM === 'function'
            );
        });

        it('true', function() {
            const tree = reBEMTestUtils.renderIntoDocument(
                React.createElement(TestSingle)
            );
            const component = reBEMTestUtils.findRenderedDOMComponentWithTag(tree, 'span');

            assert.strictEqual(
                reBEMTestUtils.isCompositeComponentWithBEM(component, bemjson),
                true
            );
        });

        it('false', function() {
            const tree = reBEMTestUtils.renderIntoDocument(
                React.createElement(TestSingle)
            );
            const component = reBEMTestUtils.findRenderedDOMComponentWithTag(tree, 'span');

            assert.strictEqual(
                reBEMTestUtils.isCompositeComponentWithBEM(component, { block: 'block' }),
                false
            );
        });
    });

    describe('scryRenderedDOMComponentsWithBEM', function() {
        it('is function', function() {
            assert.ok(
                typeof reBEMTestUtils.scryRenderedDOMComponentsWithBEM === 'function'
            );
        });

        it('simple', function() {
            const tree = reBEMTestUtils.renderIntoDocument(
                React.createElement(TestMultiple)
            );

            const result = reBEMTestUtils.scryRenderedDOMComponentsWithBEM(tree, bemjson);

            assert.strictEqual(result.length, 2);
        });

        it('not found', function() {
            const tree = reBEMTestUtils.renderIntoDocument(
                React.createElement(TestMultiple)
            );

            const result = reBEMTestUtils.scryRenderedDOMComponentsWithBEM(tree, { block: 'block' });

            assert.strictEqual(result.length, 0);
        });
    });

    describe('findRenderedDOMComponentWithBEM', function() {
        it('is function', function() {
            assert.ok(
                typeof reBEMTestUtils.findRenderedDOMComponentWithBEM === 'function'
            );
        });

        it('simple', function() {
            const tree = reBEMTestUtils.renderIntoDocument(
                React.createElement(TestSingle)
            );

            const result = reBEMTestUtils.findRenderedDOMComponentWithBEM(tree, bemjson);

            assert.ok(reBEMTestUtils.isDOMComponent(result));
        });

        it('did not find exactly one match', function() {
            const msg = 'Did not find exactly one match (found: 2) for bemjson:';
            const tree = reBEMTestUtils.renderIntoDocument(
                React.createElement(TestMultiple)
            );

            assert.throws(
                function() {
                    reBEMTestUtils.findRenderedDOMComponentWithBEM(tree, bemjson);
                },
                function(error) {
                    return error.message.indexOf(msg) === 0;
                }
            );
        });
    });
});

import { buildClassName } from 'rebem';
import ReactTestUtils from 'react-addons-test-utils';

const reBEMTestUtils = Object.create(ReactTestUtils);

reBEMTestUtils.isCompositeComponentWithBEM = function(instance, bemjson) {
    if (instance.className) {
        const targetClasses = instance.className.split(' ');
        const matchClasses = buildClassName(bemjson).split(' ');

        return matchClasses.every(matchClass => {
            return targetClasses.indexOf(matchClass) !== -1;
        });
    }

    return false;
};

reBEMTestUtils.scryRenderedDOMComponentsWithBEM = function(tree, bemjson) {
    return reBEMTestUtils.findAllInRenderedTree(tree, instance => {
        return reBEMTestUtils.isCompositeComponentWithBEM(instance, bemjson);
    });
};

reBEMTestUtils.findRenderedDOMComponentWithBEM = function(tree, bemjson) {
    const result = reBEMTestUtils.scryRenderedDOMComponentsWithBEM(tree, bemjson);

    if (result.length !== 1) {
        throw new Error(
            `Did not find exactly one match (found: ${result.length}) ` +
            `for bemjson: ${JSON.stringify(bemjson)}`
        );
    }

    return result[0];
};

export default reBEMTestUtils;

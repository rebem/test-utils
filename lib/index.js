import ReactTestUtils from 'react-addons-test-utils';
import isEqual from 'lodash.isequal';

import { getInstanceProps } from './utils';

const reBEMTestUtils = Object.create(ReactTestUtils);

reBEMTestUtils.scryRenderedDOMComponentsWithBEM = function(tree, bemjson) {
    return reBEMTestUtils.findAllInRenderedTree(tree, function(inst) {
        const props = getInstanceProps(inst);

        return props.block === bemjson.block &&
               props.elem === bemjson.elem &&
               props.tag === bemjson.tag &&
               isEqual(props.mods, bemjson.mods) &&
               isEqual(props.mix, bemjson.mix);
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

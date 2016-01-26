// https://github.com/airbnb/enzyme/blob/master/src/Utils.js
// istanbul ignore next
function propsOfNode(node) {
    return (node && node.props) || {};
}

// https://github.com/airbnb/enzyme/blob/master/src/MountedTraversal.js
// istanbul ignore next
function internalInstance(inst) {
    return inst._reactInternalInstance;
}

// istanbul ignore next
function getNode(inst) {
    if (!inst || inst._store || typeof inst === 'string') {
        return inst;
    }

    if (inst._currentElement) {
        return inst._currentElement;
    }

    if (internalInstance(inst)) {
        return internalInstance(inst)._currentElement;
    }

    if (inst._reactInternalComponent) {
        return inst._reactInternalComponent._currentElement;
    }

    return inst;
}

export function getInstanceProps(inst) {
    return propsOfNode(
        getNode(inst)
    );
}

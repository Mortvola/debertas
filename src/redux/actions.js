import {
    ADD_GROUP,
    UPDATE_GROUP,
    DELETE_GROUP,
    REQUEST_GROUPS,
    RECEIVE_GROUPS,
    ADD_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
} from './actionTypes';

const addGroup = (group) => ({
    type: ADD_GROUP,
    group,
});

const updateGroup = (group) => ({
    type: UPDATE_GROUP,
    group,
});

const deleteGroup = (group) => ({
    type: DELETE_GROUP,
    group,
});

const requestGroups = () => ({
    type: REQUEST_GROUPS,
});

const receieveGroups = (groups) => ({
    type: RECEIVE_GROUPS,
    groups,
});

const fetchGroups = () => (
    (dispatch) => {
        dispatch(requestGroups());

        return (
            fetch('/groups')
                .then(
                    (response) => response.json(),
                    (error) => console.log('fetch error: ', error),
                )
                .then(
                    (json) => dispatch(receieveGroups(json)),
                )
        );
    }
);

const addCategory = (category) => ({
    type: ADD_CATEGORY,
    category,
});

const updateCategory = (category) => ({
    type: UPDATE_CATEGORY,
    category,
});

const deleteCategory = (category) => ({
    type: DELETE_CATEGORY,
    category,
});


export {
    addGroup,
    updateGroup,
    deleteGroup,
    requestGroups,
    receieveGroups,
    fetchGroups,
    addCategory,
    updateCategory,
    deleteCategory,
};

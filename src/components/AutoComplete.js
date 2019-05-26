import React from 'react';
import { Input } from 'semantic-ui-react';
import Downshift from 'downshift';

export default function AutoComplete({
  teamId,
  teamMembers,
  history,
  handleClose,
}) {
  return (
    <Downshift
      onChange={selectedUser => {
        history.push(`/view-team/user/${teamId}/${selectedUser.id}`);
        handleClose();
      }}
    >
      {({
        getInputProps,
        getItemProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <div>
          <Input
            {...getInputProps({
              placeholder: 'Message an user',
            })}
            fluid
          />
          {isOpen
            ? teamMembers
                .filter(m => !inputValue || m.username.includes(inputValue))
                .map((member, index) => (
                  <div
                    {...getItemProps({
                      key: member.id,
                      item: member,
                      style: {
                        backgroundColor:
                          highlightedIndex === index ? 'lightgray' : 'white',
                        fontWeight: selectedItem === member ? 'bold' : 'normal',
                      },
                    })}
                  >
                    {member.username}
                  </div>
                ))
            : null}
        </div>
      )}
    </Downshift>
  );
}

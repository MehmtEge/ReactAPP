import React, { useState } from 'react';

function App() {
  const [groups, setGroups] = useState([
    {
      groupKey: '',
      keys: [{ key: '', value: '' }],
    },
  ]);

  const addGroup = () => {
    setGroups([
      ...groups,
      {
        groupKey: '',
        keys: [...groups[0].keys],
      },
    ]);
  };

  const removeGroup = (groupIndex) => {
    const updatedGroups = groups.filter((group, index) => index !== groupIndex);
    setGroups(updatedGroups);
  };

  const addKey = (groupIndex) => {
    const updatedGroups = groups.map((group) => {
      if (groupIndex !== groups.indexOf(group)) {
        return group;
      }
      return {
        ...group,
        keys: [...group.keys, { key: '', value: '' }],
      };
    });
    setGroups(updatedGroups);
  };

  const removeKey = (groupIndex, keyIndex) => {
    const updatedGroups = [...groups];
    updatedGroups[groupIndex].keys = groups[groupIndex].keys.filter(
      (key, index) => index !== keyIndex
    );
    setGroups(updatedGroups);
  };

  const updateKeyValue = (groupIndex, keyIndex, key, value) => {
    const updatedGroups = [...groups];
    if (keyIndex === null) {
      updatedGroups[groupIndex][key] = value;
    } else {
      updatedGroups[groupIndex].keys[keyIndex][key] = value;
    }
    setGroups(updatedGroups);
  };

  return (
    <div className="App">
      {groups.map((group, groupIndex) => (
        <div key={groupIndex}>
          <h3>Group {groupIndex + 1}</h3>
          <div>
            <label>Group Key:</label>
            <input
              type="text"
              value={group.groupKey}
              onChange={(e) =>
                updateKeyValue(groupIndex, null, 'groupKey', e.target.value)
              }
            />
          </div>
          {group.keys.map((keyValue, keyIndex) => (
            <div key={keyIndex}>
              <label>Key:</label>
              <input
                type="text"
                value={keyValue.key}
                onChange={(e) =>
                  updateKeyValue(groupIndex, keyIndex, 'key', e.target.value)
                }
              />
              <label>Value:</label>
              <input
                type="text"
                value={keyValue.value}
                onChange={(e) =>
                  updateKeyValue(groupIndex, keyIndex, 'value', e.target.value)
                }
              />
              <button onClick={() => removeKey(groupIndex, keyIndex)}>Remove Key</button>
            </div>
          ))}
          <button onClick={() => addKey(groupIndex)}>Add Key</button>
          <button onClick={() => removeGroup(groupIndex)}>Remove Group</button>
        </div>
      ))}
      <button onClick={addGroup}>Add Group</button>
    </div>
  );
}

export default App;

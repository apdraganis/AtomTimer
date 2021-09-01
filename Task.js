var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { useState } from 'react';

var Task = function Task() {
  var _useState = useState([{
    id: 1,
    text: 'Doctors Appointment',
    day: 'Fed 5th at 2:30pm',
    reminder: true
  }, {
    id: 2,
    text: 'Meeting at School',
    day: 'Fed 6th at 1:30pm',
    reminder: true
  }]),
      _useState2 = _slicedToArray(_useState, 2),
      tasks = _useState2[0],
      setTasks = _useState2[1];

  return React.createElement(
    'div',
    null,
    tasks.map(function (task) {
      return React.createElement(
        'h3',
        { key: task.id },
        task.text
      );
    })
  );
};

export default Task;
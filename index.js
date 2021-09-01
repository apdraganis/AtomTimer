import App from './App.js';

'use strict';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return (
//       <div>
//         I am the app component!
//       </div>
//     );
//   }
// }

// function App() {
//   return (
//     <div className="App">
//       Hi!
//     </div>
//   )
// }


ReactDOM.render(React.createElement(App, null), document.querySelector('.task'));
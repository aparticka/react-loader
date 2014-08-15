/** @jsx React.DOM */

(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['react', 'spin'], factory);
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('react'), require('spin'));
  } else {
    root.Loader = factory(root.React, root.Spinner);
  }

}(this, function (React, Spinner) {

  var Loader = React.createClass({displayName: 'Loader',
    statics: {
      options: ['lines', 'length', 'width', 'radius', 'corners', 'rotate',
                'direction', 'color', 'speed', 'trail', 'shadow', 'hwaccell',
                'className', 'zIndex', 'top', 'left']
    },

    propTypes: {
      lines:     React.PropTypes.number,
      length:    React.PropTypes.number,
      width:     React.PropTypes.number,
      radius:    React.PropTypes.number,
      corners:   React.PropTypes.number,
      rotate:    React.PropTypes.number,
      direction: React.PropTypes.oneOf([1, -1]),
      color:     React.PropTypes.string,
      speed:     React.PropTypes.number,
      trail:     React.PropTypes.number,
      shadow:    React.PropTypes.bool,
      hwaccell:  React.PropTypes.bool,
      className: React.PropTypes.string,
      zIndex:    React.PropTypes.number,
      top:       React.PropTypes.string,
      left:      React.PropTypes.string
    },

    getInitialState: function () {
      return { loaded: false, options: {} };
    },

    componentDidMount: function () {
      this.updateState(this.props);
    },

    componentWillReceiveProps: function (nextProps) {
      this.updateState(nextProps);
    },

    updateState: function (props) {
      props || (props = {});

      var loaded = this.state.loaded;
      var options = this.state.options;

      // update loaded state, if supplied
      if ('loaded' in props) {
        loaded = !!props.loaded;
      }

      // update spinner options, if supplied
      this.type.options.forEach(function (key) {
        if (key in props) {
          options[key] = props[key];
        }
      });

      this.setState({ loaded: loaded, options: options }, this.spin);
    },

    spin: function () {
      if (this.isMounted() && !this.state.loaded) {
        var spinner = new Spinner(this.state.options);
        var target = this.refs.loader.getDOMNode();

        spinner.spin(target);
      }
    },

    render: function () {
      if (this.state.loaded) {
        return ( React.DOM.div({key: "content"}, this.props.children) );
      } else {
        return ( React.DOM.div({key: "loader", ref: "loader", className: "loader"}) );
      }
    }
  });

  return Loader;

}));
import React from 'react';
import {Autocomplete, AutocompleteInput} from 'pivotal-ui/react/autocomplete';
import {Collapse} from 'pivotal-ui/react/collapse';
import {Iconography, Icon} from 'pivotal-ui/react/iconography';
import {Input} from 'pivotal-ui/react/inputs';
import {componentItems} from '../helpers/content';

const searchItems = componentItems;

const ContentLink = ({onClick, link, text, active}) => {
  const className = active ? 'sidebar--item-wrapper sidebar--item-wrapper__active' : 'sidebar--item-wrapper';

  return (
    <div className={className}>
      <a onClick={onClick}
         href={link}
         className="sidebar--item">{text}</a>
    </div>
  );
};

export default class Sidebar extends React.PureComponent {
  handleClick(event) {
    event.preventDefault();
    this.props.updateContent(event.target.href);
  }

  handlePick(event) {
    const link = searchItems.find(i => i.name == event.value).href;
    this.props.updateContent(link);
  }

  render() {
    const componentLinks = componentItems.map(c => c.href);

    const onInitializeItems = callback => callback(searchItems.map(item => item.name));
    const SearchBar = () => <Autocomplete onInitializeItems={onInitializeItems}
                                          placeholder="Search"
                                          className="sidebar--search phxl"
                                          input={<AutocompleteInput><Input search/></AutocompleteInput>}
                                          onPick={this.handlePick.bind(this)}
                                          showNoSearchResults={true}/>;

    const components = componentItems
      .map((component, i) => <ContentLink key={i}
                                          onClick={this.handleClick.bind(this)}
                                          link={component.href}
                                          text={component.name}
                                          active={component.href === this.props.activePath}/>);

    return (
      <div className="sidebar">
        <div className="sidebar--header">
          <Icon className="sidebar--icon" src="pivotal_ui_white"/>
          <div className="sidebar--title plxl">Pivotal UI</div>
        </div>
        <SearchBar/>
        <div className="sidebar--items">
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="getstarted"
                       text="Get Started"
                       active={['', 'getstarted', 'index.html'].indexOf(this.props.activePath) !== -1}/>
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="faq"
                       text="FAQ"
                       active={'faq' === this.props.activePath}/>
          <Collapse className={componentLinks.indexOf(this.props.activePath) !== -1 ? 'active' : ''}
                    defaultExpanded={componentLinks.indexOf(this.props.activePath) !== -1}
                    header="Components">{components}</Collapse>
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="upgradeguide"
                       text="Upgrade Guide"
                       active={'upgradeguide' === this.props.activePath}/>
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="contribute"
                       text="Contribute"
                       active={'contribute' === this.props.activePath}/>
          <ContentLink onClick={this.handleClick.bind(this)}
                       link="versions"
                       text="Versions"
                       active={'versions' === this.props.activePath}/>
          <a className="sidebar--item" href="https://github.com/pivotal-cf/pivotal-ui">Github</a>
        </div>
      </div>
    );
  }
}
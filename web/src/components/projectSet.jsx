import React from 'react';
import { arrayOf, shape } from 'prop-types';

import { Link } from 'react-router-dom';
import { getTimeCreatedAgo } from '../functions/dataParserHelpers';
import star01 from '../images/star_01.svg';
import fork01 from '../images/fork_01.svg';
import { func } from 'prop-types';

class ProjectSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personal: true,
      starred: false,
      explore: false,
    };
  }

  handlePersonal = () => {
    this.setState({ personal: true, starred: false, explore: false });
  }

  handleStarred = () => {
    this.setState({ personal: false, starred: true, explore: false });
  }

  handleExplore = () => {
    this.setState({ personal: false, starred: false, explore: true });
  }

  render() {
    const {
      personal,
      starred,
      explore,
    } = this.state;
    const {
      projects,
      handleShowModal,
    } = this.props;
    return (
      <>
        <div className="project-dashboard">
          <div className="project-list">
            <div
              className={
                `project-tab ${personal ? 'project-border' : ''}`
              }
              onClick={this.handlePersonal}
            >
              <p>Your Projects </p>

            </div>
            <div
              className={
                `project-tab ${starred? 'project-border' : ''}`
              }
              onClick={this.handleStarred}
            >
              <p>Starred Projects </p>

            </div>
            <div
              className={
                `project-tab ${explore ? 'project-border' : ''}`
              }
              onClick={this.handleExplore}
            >
              <p>Explore Projects </p>
            </div>
          </div>
        </div>
        <hr style={{ marginTop: '0' }} />{console.log(projects)}

        {personal && projects.map((proj) => proj.name.includes('forked')
          && (
          <Project
            key={`proj-key-${proj.id}`}
            owner={proj.id}
            name={proj.name}
            projId={proj.id}
            branch={proj.default_branch}
            desc={proj.description}
            avatar={proj.avatar_url}
            starCount={proj.star_count}
            forkCount={proj.forks_count}
            updatedAt={proj.last_activity_at}
            projects={projects}
            handleShowModal={handleShowModal}
          />
          ))}
        {explore && projects.map((proj) => !proj.name.includes('forked')
          && (
          <Project
            key={`proj-key-${proj.id}`}
            owner={proj.id}
            name={proj.name}
            projId={proj.id}
            branch={proj.default_branch}
            desc={proj.description}
            avatar={proj.avatar_url}
            starCount={proj.star_count}
            forkCount={proj.forks_count}
            updatedAt={proj.last_activity_at}
            projects={projects}
            handleShowModal={handleShowModal}
          />
          ))}
      </>
    );
  }
}

const Project = ({ ...props }) => (
  <div id="project-display" onClick={props.click}>
    <div style={{minWidth: '0', flex: '1 1 40%'}}>
      <div id="project-icon">
        <div className="project-pic">
          <img style={{ minWidth: '100%' }} src={props.avatar} alt="" />
        </div>
      </div>
      <div id="project-descriptor">
        <Link to={`/my-projects/${props.projId}/${props.branch}`}>
          <h4 style={{ margin: '0', marginBottom: '5px' }}>
            {props.owner}
            /
            {props.name}
          </h4>
          <span
            style={{
              maxWidth: '400px',
              textOverflow: 'ellipsis',
            }}
          >
            {props.desc
              ? props.desc.length > 50
                ? `${props.desc.substring(0, 100)}...`
                : props.desc
              : 'No description'}
          </span>
        </Link>
      </div>
    </div>

    <div style={{flex: '1 1 10%', justifyContent: 'space-between'}}>
      <div id="pro-info">
        <div>
          <img className="dropdown-white" src={star01} alt="" />
            {props.starCount}
        </div>
        <div>
          <img className="dropdown-white" src={fork01} alt="" />
            {props.forkCount}
        </div>
      </div>
      <div style={{display: "flex"}}>
      <p>Updated {getTimeCreatedAgo(props.updatedAt, new Date())} ago</p>
      <button
        type="button"
        style={{
          margin: '0.5em',
          cursor: 'pointer',
        }}
        className="dangerous-red"
        onClick={
            () => props.handleShowModal(
              props.name,
              props.owner,
            )
          }
      >
        <b>
          X
        </b>
      </button>
      </div>
    </div>
  </div>
);

ProjectSet.propTypes = {
  projects: arrayOf(
    shape({
    }).isRequired,
  ).isRequired,
  handleShowModal: func.isRequired,
}

export default ProjectSet;
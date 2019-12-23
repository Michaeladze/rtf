import React from 'react';
import './ProjectItem.scss';
import { IIncomeAssessmentDetails } from '../../../../_store/reducers/users-request.reducer';
import ShowMoreText from '../../../../components/ShowMoreText';
import Comment from '../../../../components/Comment';
import { ReactComponent as Icon } from '../../../../_assets/svg/feedback-property-icon.svg';

interface IProjectItemProps {
  project: IIncomeAssessmentDetails;
}

const ProjectItem: React.FC<IProjectItemProps> = ({ project }) => {
  /** Комментарий */
  let comment = '';
  if (project.sRespondentComment) {
    comment = project.sRespondentComment;
  }

  if (project.sRequesterComment) {
    comment = project.sRequesterComment
  }

  const commentJSX = project.sRespondentComment &&
    <div className='project-item__rating-comment'>
      <Comment comment={comment} textLength={100}/>
    </div>;

  /** Отображение иконки, если нет оценки */
  const isIconIndicator = project.iGrade ?
    (<div className='project-item__rating'>{project.iGrade}</div>) :
    (<div className='project-item__icon'><Icon/></div>);

  return (
    <div className='project-item'>
      <p className='project-item__name'>Достижение</p>

      <div className='project-item__indicator'>
        {isIconIndicator}
        {project.sCanNotAnswerType ? <p className='no-rate'>Выбран вариант &quot;Не могу оценить&quot;</p> : commentJSX}
      </div>

      <article className='project-item__content'>
        <h3 className='project-item__title'>{project.oProject.sName}</h3>
        <div className='project-item__description'>
          <ShowMoreText text={project.oProject.sDescription as string} textLength={300}/>
        </div>
      </article>
    </div>
  );
};

export default ProjectItem;

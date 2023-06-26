import { dataActions } from '../../../store';
import clsx from '../../../utils/clsx';
import CloseButton from '../../common/CloseButton/CloseButton';
import classes from './TaskComponent.module.css';

import { useDispatch } from 'react-redux';

/**
 * @param {{ task: Task, cardId: string }} props
 */
const CardElement = function (props) {
  const { task, cardId } = props;
  const dispatch = useDispatch();

  const onDeleteTask = function () {
    dispatch(dataActions.deleteTask({ taskId: task.id, cardId }));
  };

  const markAsDone = function () {
    dispatch(dataActions.markTaskAsDone({ taskId: task.id, cardId }));
  };

  return (
    <>
      <div className={classes['list-element']}>
        <button
          onClick={markAsDone}
          className={clsx(classes.checkBox, task.done && classes.done)}
        >
          <ion-icon name='checkmark-outline' />
        </button>
        <li className={clsx(task.done && classes.doneText)}>{task.content}</li>
        <CloseButton
          onClick={onDeleteTask}
          color={'darkBlue'}
          size={'small'}
          className={classes['btnClose-small']}
        />
      </div>
    </>
  );
};

export default CardElement;

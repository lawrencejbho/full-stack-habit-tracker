export default function Dropdown(props) {
  return (
    <>
      <div className="tw-flex tw-items-center tw-py-4 tw-border-slate-200 tw-border-b tw-border-t-0 tw-border-solid tw-border-x-0">
        <div className="tw-flex-1">{props.question}</div>
        <i
          className="fas fa-chevron-down tw-text-bookmark-purple"
          onClick={() => props.handleClick(props.id)}
        ></i>
      </div>
      {props.selected === true && (
        <div className="tw-flex tw-items-center tw-py-4 tw-border-slate-200 tw-border-b tw-border-t-0 tw-border-solid tw-border-x-0">
          {props.answer}
        </div>
      )}
    </>
  );
}

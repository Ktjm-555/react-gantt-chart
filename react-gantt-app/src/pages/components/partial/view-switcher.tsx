import React from "react";
import { ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";

type ViewSwitcherProps = {
	onViewModeChange: (viewMode: ViewMode) => void;
	onViewListChange: (isChecked: boolean) => void;
	isChecked: boolean;
};

const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
	onViewModeChange,
	onViewListChange,
	isChecked,
}) => {
	return (
		<div className="ViewContainer">
			<button className="Button" onClick={() => onViewModeChange(ViewMode.Day)}>
				Day
			</button>
			<button
				className="Button"
				onClick={() => onViewModeChange(ViewMode.Week)}
			>
				Week
			</button>
			<button
				className="Button"
				onClick={() => onViewModeChange(ViewMode.Month)}
			>
				Month
			</button>

			<div className="Switch">
				<label className="Switch_Toggle">
					<input
						type="checkbox"
						checked={isChecked}
						onChange={() => onViewListChange(!isChecked)}
					/>
					<span className="Slider" />
				</label>
			</div>
		</div>
	);
};

// デフォルトプロパティの設定
ViewSwitcher.defaultProps = {
	isChecked: false,
};

export default ViewSwitcher;

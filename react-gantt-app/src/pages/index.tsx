import React, { useState } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import styled from "styled-components";
import ViewSwitcher from "./components/partial/view-switcher";

// TODO
// projectタスクは、進捗、期間ともに子タスクに依存するようにする。（データフェッチの際のデータの入れ方でできそう。）
// 進捗率を反映させる（progressはあるので、そこに計算したものを入れるでOK）
// タスク増やす、inputなど非対応

export const convertFlg2Width = () => {
	return {
		title: 200,
		icon: 30,
		period: 70,
		progress: 70,
	};
};

interface TaskListHeader {
	headerHeight: number;
	rowWidth: string;
	fontFamily: string;
	fontSize: string;
	isOpenColumn: boolean;
}

// タスク表示の方のヘッダーコンポーネント
export const TaskListHeader: React.FC<TaskListHeader> = ({
	headerHeight,
	fontFamily,
	fontSize,
	rowWidth,
	isOpenColumn,
}) => {
	const width = convertFlg2Width();

	return (
		<DIV_HederTable
			$rowWidth={rowWidth}
			fontFamily={fontFamily}
			fontSize={fontSize}
		>
			<DIV_HeadeTableRow $headerHeight={headerHeight}>
				<DIV_HeadeTableItem width={width.icon} $position="left" />

				<DIV_HeadeTableItem width={width.title + width.icon} $position="left">
					タスク名
				</DIV_HeadeTableItem>
				<DIV_HeadeTableItem width={width.period} $position="left">
					備考
				</DIV_HeadeTableItem>
				<DIV_HeadeTableItem width={width.progress} $position="center">
					総数
				</DIV_HeadeTableItem>
				<DIV_HeadeTableItem width={width.progress} $position="center">
					担当
				</DIV_HeadeTableItem>
				<DIV_HeadeTableItem width={width.progress} $position="center">
					工数時間
				</DIV_HeadeTableItem>
				{isOpenColumn && (
					<>
						<DIV_HeadeTableItem width={width.progress} $position="center">
							予定開始
						</DIV_HeadeTableItem>
						<DIV_HeadeTableItem width={width.progress} $position="center">
							予定終了
						</DIV_HeadeTableItem>
						<DIV_HeadeTableItem width={width.progress} $position="center">
							実績開始
						</DIV_HeadeTableItem>
						<DIV_HeadeTableItem width={width.progress} $position="center">
							実績終了
						</DIV_HeadeTableItem>
					</>
				)}
				<DIV_HeadeTableItem width={width.progress} $position="center">
					完了総数
				</DIV_HeadeTableItem>
				<DIV_HeadeTableItem width={width.progress} $position="center">
					進捗
				</DIV_HeadeTableItem>
			</DIV_HeadeTableRow>
		</DIV_HederTable>
	);
};

// スタイル定義
const DIV_HederTable = styled.div<{
	$rowWidth: string;
	fontFamily: string;
	fontSize: string;
}>`
	display: ${({ $rowWidth }) => ($rowWidth === "0000" ? "none" : "table")};
	font-family: ${({ fontFamily }) => fontFamily};
	font-size: ${({ fontSize }) => fontSize};
`;

const DIV_HeadeTableRow = styled.div<{ $headerHeight: number }>`
	height: ${({ $headerHeight }) => $headerHeight - 2}px;
	display: flex;
`;

const DIV_HeadeTableItem = styled.div<{ width: number; $position: string }>`
	max-width: ${({ width }) => `${width}px`};
	min-width: ${({ width }) => `${width}px`};
	text-align: ${({ $position }) => $position};
	overflow: hidden;
`;

// タスク表示カラムコンポーネント

// 型定義
interface TaskType {
	id: string;
	name: string;
	start: Date;
	end: Date;
	actualStartDate?: Date;
	actualEndDate?: Date;
	memo: string;
	totalCount: number;
	assignee: string;
	plannedTime: number;
	completeTask: number;
	hideChildren?: boolean;
	progress: number;
	type: string;
	project?: string;
	level: number;
}

interface TaskListColumn {
	rowHeight: string;
	rowWidth: string;
	fontFamily: string;
	fontSize: string;
	locale: string;
	tasks: TaskType[];
	isOpenColumn: boolean;
	onExpanderClick: (task: TaskType) => any;
}

export const TaskListColumn: React.FC<TaskListColumn> = ({
	rowHeight,
	rowWidth,
	tasks,
	fontFamily,
	fontSize,
	isOpenColumn,
	onExpanderClick,
}) => {
	// 日付のフォーマットを整える
	const formatDate = (date: any) => {
		return `${date.getMonth() + 1}/${date.getDate()}`;
	};

	// widthの調整
	const width = convertFlg2Width();

	return (
		<DIV_TaskListTable
			fontFamily={fontFamily}
			fontSize={fontSize}
			$rowWidth={rowWidth}
		>
			{tasks.map((task) => (
				<DIV_TaskListTableRow key={task.id} $rowHeight={rowHeight}>
					<DIV_TaskListTableItem width={width.icon} $position="center">
						<>
							{task.type === "project" && "hideChildren" in task && (
								<span onClick={() => onExpanderClick(task)}>
									{task.hideChildren ? "▼" : "▲"}
								</span>
							)}
						</>
					</DIV_TaskListTableItem>
					<DIV_TaskListTableItem
						width={width.title + width.icon}
						$position="left"
						style={{ paddingLeft: `${task.level * 10}px` }}
					>
						{task.name}
					</DIV_TaskListTableItem>
					<DIV_TaskListTableItem width={width.period} $position="left">
						{task.memo}
					</DIV_TaskListTableItem>
					<DIV_TaskListTableItem width={width.progress} $position="center">
						{task.totalCount}
					</DIV_TaskListTableItem>
					<DIV_TaskListTableItem width={width.progress} $position="center">
						{task.assignee}
					</DIV_TaskListTableItem>
					<DIV_TaskListTableItem width={width.progress} $position="center">
						{task.plannedTime}
					</DIV_TaskListTableItem>
					{isOpenColumn && (
						<>
							<DIV_TaskListTableItem width={width.progress} $position="center">
								{formatDate(task.start)}
							</DIV_TaskListTableItem>
							<DIV_TaskListTableItem width={width.progress} $position="center">
								{formatDate(task.end)}
							</DIV_TaskListTableItem>
							<DIV_TaskListTableItem width={width.progress} $position="center">
								{task.actualStartDate ? formatDate(task.actualStartDate) : ""}
							</DIV_TaskListTableItem>
							<DIV_TaskListTableItem width={width.progress} $position="center">
								{task.actualEndDate ? formatDate(task.actualEndDate) : ""}
							</DIV_TaskListTableItem>
						</>
					)}

					<DIV_TaskListTableItem width={width.progress} $position="center">
						{task.completeTask}
					</DIV_TaskListTableItem>
					<DIV_TaskListTableItem width={width.progress} $position="center">
						{(task.completeTask / task.totalCount) * 100 || ""}%
					</DIV_TaskListTableItem>
				</DIV_TaskListTableRow>
			))}
		</DIV_TaskListTable>
	);
};

// スタイル定義
interface DIV_TaskListTableProps {
	fontFamily: string;
	fontSize: string;
	$rowWidth: string;
}

const DIV_TaskListTable = styled.div<DIV_TaskListTableProps>`
	font-family: ${(props) => props.fontFamily};
	font-size: ${(props) => props.fontSize};
	display: ${(props) => (props.$rowWidth === "0000" ? "none" : "table")};
`;

const DIV_TaskListTableRow = styled.div<{ $rowHeight: string }>`
	height: ${({ $rowHeight }) => $rowHeight}px;
	display: flex;
`;

const DIV_TaskListTableItem = styled.div<{ width: number; $position: string }>`
	max-width: ${({ width }) => `${width}px`};
	min-width: ${({ width }) => `${width}px`};
	text-align: ${({ $position }) => $position};
	overflow: hidden;
`;

// データ
export function initTasks() {
	const currentDate = new Date();
	const tasks = [
		{
			id: "Project1",
			name: "Project1",
			start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
			end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
			memo: "備考です。",
			totalCount: 10,
			assignee: "北島華帆",
			plannedTime: 4,
			completeTask: 2,
			hideChildren: false,
			type: "project",
			level: 0,
			progress: 0,
		},
		{
			id: "Project1-task",
			name: "Project1-task",
			start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
			end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
			memo: "備考です。",
			totalCount: 10,
			assignee: "北島華帆",
			plannedTime: 4,
			completeTask: 2,
			progress: 50,
			type: "task",
			project: "Project1",
			level: 1,
		},
		{
			id: "Project1-1",
			name: "Project1-1",
			start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
			end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
			memo: "備考です。",
			totalCount: 10,
			assignee: "北島華帆",
			plannedTime: 4,
			completeTask: 2,
			progress: 100,
			type: "project",
			project: "Project1",
			hideChildren: false,
			level: 1,
		},
		{
			id: "Project1-1-task1",
			name: "Project1-1-task1",
			start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
			end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
			memo: "備考です。",
			totalCount: 10,
			assignee: "北島華帆",
			plannedTime: 4,
			completeTask: 2,
			progress: 0,
			type: "task",
			project: "Project1-1",
			level: 2,
		},
		{
			id: "Project1-1-task2",
			name: "Project1-1-task2",
			start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
			end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
			memo: "備考です。",
			totalCount: 10,
			assignee: "北島華帆",
			plannedTime: 4,
			completeTask: 2,
			progress: 40,
			type: "task",
			project: "Project1-1",
			level: 2,
		},
		{
			id: "Project2",
			name: "Project2",
			start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
			end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
			memo: "備考です。",
			totalCount: 10,
			assignee: "北島華帆",
			plannedTime: 4,
			completeTask: 2,
			hideChildren: false,
			progress: 50,
			type: "project",
			level: 0,
		},
		{
			id: "Project2-task",
			name: "Project2-task",
			start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
			end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 20),
			memo: "備考です。",
			totalCount: 10,
			assignee: "北島華帆",
			plannedTime: 4,
			completeTask: 2,
			progress: 60,
			type: "task",
			project: "Project2",
			level: 1,
		},
		{
			id: "Project2-1",
			name: "Project2-1",
			start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
			end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 30),
			memo: "備考です。",
			totalCount: 10,
			assignee: "北島華帆",
			plannedTime: 4,
			completeTask: 2,
			progress: 50,
			type: "project",
			project: "Project2",
			hideChildren: false,
			level: 1,
		},
		{
			id: "Project2-1-task",
			name: "Project2-1-task",
			start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
			end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 30),
			memo: "備考です。",
			totalCount: 10,
			assignee: "北島華帆",
			plannedTime: 4,
			completeTask: 2,
			progress: 100,
			type: "task",
			project: "Project2-1",
			level: 2,
		},
	];
	return tasks;
}

// プロジェクトの期間をタスクに合わせる
export const getStartEndDateForProject = (tasks: any[], projectId: any) => {
	const projectTasks = tasks.filter((t) => t.project === projectId);
	let start = projectTasks[0].start;
	let end = projectTasks[0].end;
	for (let i = 0; i < projectTasks.length; i++) {
		const task = projectTasks[i];
		if (start.getTime() > task.start.getTime()) {
			start = task.start;
		}
		if (end.getTime() < task.end.getTime()) {
			end = task.end;
		}
	}
	return [start, end];
};

// ガントチャート表示コンポーネント
const CreateGantt = () => {
	const [view, setView] = useState(ViewMode.Day);
	const [tasks, setTasks] = useState<TaskType[]>(initTasks());
	const [isOpenColumn, setIsOpenColumn] = useState<boolean>(true);

	// TaskListColumnコンポーネントprops設定
	const TaskListColumnWrapper = (
		props: React.JSX.IntrinsicAttributes & TaskListColumn
	) => {
		return <TaskListColumn {...props} isOpenColumn={isOpenColumn} />;
	};

	// TaskListHeaderコンポーネントprops設定
	const TaskListHeadernWrapper = (
		props: React.JSX.IntrinsicAttributes & TaskListHeader
	) => {
		return <TaskListHeader {...props} isOpenColumn={isOpenColumn} />;
	};

	// プロジェクトの開始日終了日をタスクと合わせる
	const handleTaskChange = (task: TaskType): void => {
		let newTasks = tasks.map((t) => (t.id === task.id ? task : t));
		if (task.project) {
			const [start, end] = getStartEndDateForProject(newTasks, task.project);
			const project = newTasks.find((t) => t.id === task.project);
			if (
				project &&
				(project.start.getTime() !== start.getTime() ||
					project.end.getTime() !== end.getTime())
			) {
				const changedProject = { ...project, start, end };
				newTasks = newTasks.map((t) =>
					t.id === task.project ? changedProject : t
				);
			}
		}
		setTasks(newTasks);
	};

	// プロジェクト（大タスク）の開閉
	const handleExpanderClick = (task: TaskType): void => {
		setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
	};

	// 期限切れかどうか
	const isPastDue = (task: TaskType): boolean => {
		if (task.progress >= 100) return false;

		const today = new Date();
		return new Date(task.end) < today;
	};

	// 日付のみを使用して期間を計算
	const calculateDaysBetweenDates = (
		startDate: Date,
		endDate: Date
	): number => {
		// TODO:この辺りの計算はday.jsなどを使った方が良さそう。
		// 時間を無視するために、日付のみに設定
		startDate.setHours(0, 0, 0, 0);
		endDate.setHours(0, 0, 0, 0);

		// 日数の差異を計算
		const differenceInTime = startDate.getTime() - endDate.getTime();

		// ミリ秒を日数に変換し、整数に丸める
		return Math.floor(differenceInTime / (1000 * 3600 * 24));
	};

	// 期限内に終わりそうかどうか
	const isOnTrack = (task: TaskType): boolean => {
		if (task.progress === 100) return true;

		const today = new Date();

		// 計画開始と終了までの時間
		const plannedDuration = calculateDaysBetweenDates(task.start, task.end);
		// 現在の時間と開始までの時間
		const elapsedDuration = calculateDaysBetweenDates(task.start, today);

		const expectedProgress = elapsedDuration / plannedDuration;

		// タスクの進捗率が経過時間に対して適切であるかどうか
		return task.progress / 100 >= expectedProgress;
	};

	// スタイルを当てはめる
	const createBarStyle = (backgroundColor: string, progressColor: string) => ({
		backgroundColor: backgroundColor,
		backgroundSelectedColor: backgroundColor,
		progressColor: progressColor,
		progressSelectedColor: progressColor,
	});

	// 追加するスタイルを取得
	// TODO:color定数で行う
	const getTaskBarStyle = (task: TaskType) => {
		if (task.type === "project") {
			if (!task.hideChildren) {
				return createBarStyle("#5278a4de", "#a9b5c3de");
			} else {
				return createBarStyle("#6986a7b3", "#35649b");
			}
		} else if (isPastDue(task) || !isOnTrack(task)) {
			return createBarStyle("#F4E5B0", "#EFB442");
		}
		return createBarStyle("#8ff2f985", "#5DD4EE");
	};

	// タスクのデータにスタイルを追加
	const styledTasks = tasks.map((task) => ({
		...task,
		styles: getTaskBarStyle(task),
	}));

	return (
		<div>
			<ViewSwitcher
				onViewModeChange={(viewMode) => setView(viewMode)}
				onViewListChange={(isChecked) =>
					console.log("View list changed", isChecked)
				}
				isChecked={true}
			/>
			<h3>Gantt With Limited Height</h3>
			<Gantt
				tasks={styledTasks as any}
				viewMode={view}
				TaskListTable={TaskListColumnWrapper as any}
				TaskListHeader={TaskListHeadernWrapper as any}
				onDateChange={handleTaskChange as any}
				onExpanderClick={handleExpanderClick as any}
				listCellWidth={"155px"}
				ganttHeight={500}
				rowHeight={35}
			/>
			<button onClick={() => setIsOpenColumn(!isOpenColumn)}>
				表示・非表示
			</button>
		</div>
	);
};

export default CreateGantt;

import React, { useEffect } from "react";
import { DIRECTION } from "../../constants/enum";

const AutoScroll = ({
	direction = DIRECTION.UP,
	children,
	bookId,
	chapterId,
}) => {
	useEffect(() => {
		let options = {
			top: 0,
			left: 0,
			behavior: "smooth",
		};

		switch (direction) {
			case DIRECTION.UP:
				options.top = 0;
				break;
			case DIRECTION.DOWN:
				options.top = document.body.scrollHeight;
				break;
			case DIRECTION.RIGHT:
				options.left = document.body.scrollWidth;
				break;
			case DIRECTION.LEFT:
				options.left = 0;
				break;
			default:
				break;
		}
		window.scrollTo(options);
	}, [bookId, chapterId]);
	return <>{children}</>;
};
export default AutoScroll;

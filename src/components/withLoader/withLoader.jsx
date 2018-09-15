import React from 'react';
import ComponentLoader from './ComponentLoader';

const withLoader = (Component) => {
	return function componentWithLoader({ isLoading, ...props }) {
		if (isLoading) {
			return <ComponentLoader />;
		}

		return (
			<Component isLoading={isLoading} {...props} />
		);
	};
};

export default withLoader;

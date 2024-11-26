import * as React from 'react';
import {loginRedirect} from "../helpers/authToken";

export const SignOutButton = ({}) => (
	<button type="button" className="button w-button" onClick={() => loginRedirect()}>
		Sign out
	</button>
);

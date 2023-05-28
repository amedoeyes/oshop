import { User } from "../app/types";
import useAuth from "../hooks/useAuth";

type IsRoleProps = {
	role: User["role"] | User["role"][];
	children: React.ReactNode;
};

export default function UserHasRole({ role, children }: IsRoleProps) {
	const { userHasRole } = useAuth();

	if (!userHasRole(role)) return <></>;

	return <>{children}</>;
}

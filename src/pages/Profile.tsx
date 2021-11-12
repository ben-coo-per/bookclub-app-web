import { ProfileUserBox } from "../components/Profile/ProfileUserBox";

export function Profile() {
  return (
    <main>
      <div className="w-screen py-10 px-8 grid grid-cols-4 ">
        <ProfileUserBox />
      </div>
    </main>
  );
}

import { ProfileUserBox } from "../components/Profile/ProfileUserBox";

export function Profile() {
  return (
    <main>
      <div className="w-screen bg-background py-10 px-4 grid grid-cols-4 ">
        <ProfileUserBox />
      </div>
    </main>
  );
}

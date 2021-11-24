export function getMeetingIsHappening(dateTime: Date) {
  const meetingTime = dateTime.getTime();
  const now = new Date().getTime();

  const beforeMeetingLimit = 1000 * 60 * 30; // 30 minutes
  const afterMeetingLimit = 1000 * 60 * 60 * 4; // 4 hrs

  if (meetingTime - now > 0 && meetingTime - now < beforeMeetingLimit) {
    return true;
  }
  if (now - meetingTime > 0 && now - meetingTime < afterMeetingLimit) {
    return true;
  }

  return false;
}

import { RpcClient, signInListener } from "../gapi";

export class MockRpcClient implements RpcClient {
    isSignedIn = false;
    signInListener: signInListener = function () { };
    calendars: gapi.client.calendar.CalendarListEntry[] = [];

    signIn() {
        this.isSignedIn = true;
        this.signInListener(true);
    }

    signOut() {
        this.isSignedIn = false;
        this.signInListener(false);
    }

    listCalendars({ minAccessRole }: { minAccessRole: string }) {
        return Promise.resolve(this.calendars);
    }

    getIsSignedIn() {
        return this.isSignedIn;
    }

    setSignInListener(listener: signInListener) {
        this.signInListener = listener;
    }

    setMockCalendarList(calendars: gapi.client.calendar.CalendarListEntry[]) {
        this.calendars = calendars;
    }
}

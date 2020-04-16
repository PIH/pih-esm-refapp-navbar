import { of } from "rxjs";

export const openmrsFetch = jest.fn().mockReturnValue(new Promise(() => {}));

export const getCurrentUser = jest
  .fn()
  .mockImplementation(({ includeAuthStatus }) => {
    if (includeAuthStatus) {
      return of({
        user: { display: "admin" },
        sessionLocation: { display: "Narnia" }
      });
    } else {
      return of({ display: "admin" });
    }
  });

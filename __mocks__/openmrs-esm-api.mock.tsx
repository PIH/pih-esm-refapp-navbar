import { of } from "rxjs";

export const openmrsFetch = jest.fn().mockReturnValue(new Promise(() => {}));

export const getCurrentUser = jest
  .fn()
  .mockReturnValue(of({ display: "admin" }));

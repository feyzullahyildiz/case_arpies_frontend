import { describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent, RenderResult } from "@testing-library/react";
import { CreateJob } from "../components/CreateJob";
import { store } from "../app/store";
import { Provider } from "react-redux";

const sleep = (t: number) => new Promise((res) => setTimeout(res, t));
describe("Create A Task", () => {
  let renderResult: RenderResult | null = null;
  beforeEach(() => {
    renderResult = render(
      <Provider store={store}>
        <CreateJob naviteSelect />
      </Provider>,
    );
  });

  it("should create a task in store", async () => {
    const { getByTestId } = renderResult!;
    expect(store.getState().job.jobs.length).toEqual(0);
    const inputText = await getByTestId("createJobInputText");

    const select = getByTestId("prioritySelect");
    await fireEvent.mouseDown(select);
    const button = await getByTestId("submit-button");

    fireEvent.change(select, {
      target: { value: "URGENT" },
    });

    fireEvent.input(inputText, {
      target: { value: "JOB TEXT" },
    });
    fireEvent.click(button);
    await sleep(50);
    expect(store.getState().job.jobs.length).toEqual(1);
    const newJob = store.getState().job.jobs[0];
    
    expect(newJob.id).toEqual(1);
    expect(newJob.name).toEqual("JOB TEXT");
    expect(newJob.priority).toEqual("URGENT");
  });
});

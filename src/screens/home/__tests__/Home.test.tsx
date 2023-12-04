import { NewsChunk } from "../../../types/news/NewsChunk";
import { render } from "@testing-library/react-native";
import Home from "../Home";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
describe("<Home/>", () => {
  it("component rendering", () => {
    const initialState = {}; // Add your initial state here
    const mockStore = configureStore();
    const store = mockStore(initialState);
    const newsChunkDummy: NewsChunk[] = [
      {
        category: "Science",
        news: [
          {
            _id: "",
            authors: "",
            category: "Science",
            date: "2014",
            headline: "Science news",
            link: "https://justAlink",
            short_description: "description",
          },
        ],
      },
    ];

    const { getByText } = render(
      <Provider store={store}>
        <Home newsChunk={newsChunkDummy} />
      </Provider>
    );

    const newsTitle = getByText("Science news");

    expect(newsTitle).toBeTruthy();
  });
});

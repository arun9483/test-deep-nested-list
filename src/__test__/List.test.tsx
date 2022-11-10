import { render, screen, within } from '@testing-library/react';
import List from './../List';
import { list } from './../data';

describe('test nested list functionality', () => {
  test('render main-list heading and verify list item count', () => {
    render(<List title="main-list" list={list} />);

    const heading = screen.getByRole('heading', {
      name: /main-list/i,
      level: 3,
    });
    // screen.debug(heading);

    // assert main heading
    expect(heading).toBeInTheDocument();
    const listContainer = screen.getByRole('list', {
      name: /main-list/i,
    });

    //assert main list is rendered
    expect(listContainer).toBeInTheDocument();

    //assert main list is has valid number of list items
    expect(listContainer.childNodes).toHaveLength(4);
  });

  test('without nested list', () => {
    render(<List title="main-list" list={list} />);

    const thirdItem = screen.getByRole('listitem', { name: /list13/ });
    //assert thirdItem of list is rendered as listItem
    expect(thirdItem).toBeInTheDocument();

    //assert thirdItem's text is displayed
    expect(within(thirdItem).getByText(/list13/i)).toBeInTheDocument();

    const ul = within(thirdItem).queryByRole('list', {
      name: /list13/i,
    });
    //assert thirdItem does not have nested list
    expect(ul).not.toBeInTheDocument();
  });

  test('with nested list', () => {
    render(<List title="main-list" list={list} />);

    const secondItem = screen.getByRole('listitem', { name: /list12/ });
    //assert secondItem of list is rendered as listItem
    expect(secondItem).toBeInTheDocument();

    //assert secondItem is displayed as heading
    expect(
      within(secondItem).getByRole('heading', {
        name: 'list12',
        level: 3,
      })
    ).toBeInTheDocument();

    const ul = within(secondItem).getByRole('list', {
      name: /list12/i,
    });
    //assert secondItem should have nested list
    expect(ul).toBeInTheDocument();

    //assert secondItem's list item count
    expect(ul.childNodes).toHaveLength(5);
  });
});

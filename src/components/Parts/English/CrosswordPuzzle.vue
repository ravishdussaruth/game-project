<template>
  <div class="crossword">
    <table>
      <tbody>
      <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
        <td v-for="(cell, colIndex) in row" :key="colIndex">
          <input
            v-model="cell.value"
            :maxlength="1"
            :class="{ 'correct': cell.correct }"
            @input="checkWord(rowIndex, colIndex)"
          />
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      grid: [],
      words: ['word1', 'word2', 'word3'], // List of correct words
    };
  },
  methods: {
    createCrossword(rows, cols) {
      return new Array(rows).fill(null).map(() =>
        new Array(cols).fill({value: '', correct: false})
      );
    },

    placeWords(grid) {
      this.words.forEach(word => {
        let placed = false;

        // Try to place the word horizontally
        for (let row = 0; row < grid.length; row++) {
          for (let col = 0; col <= grid[row].length - word.length; col++) {
            let canPlace = true;

            for (let i = 0; i < word.length; i++) {
              if (grid[row][col + i].value !== '' && grid[row][col + i].value !== word[i]) {
                canPlace = false;
                break;
              }
            }

            if (canPlace) {
              for (let i = 0; i < word.length; i++) {
                grid[row][col + i].value = word[i];
              }
              placed = true;
              break;
            }
          }
          if (placed) break;
        }

        if (!placed) {
          // Try to place the word vertically
          for (let col = 0; col < grid[0].length; col++) {
            for (let row = 0; row <= grid.length - word.length; row++) {
              let canPlace = true;

              for (let i = 0; i < word.length; i++) {
                if (grid[row + i][col].value !== '' && grid[row + i][col].value !== word[i]) {
                  canPlace = false;
                  break;
                }
              }

              if (canPlace) {
                for (let i = 0; i < word.length; i++) {
                  grid[row + i][col].value = word[i];
                }
                placed = true;
                break;
              }
            }
            if (placed) break;
          }
        }
      });

      return grid;
    },

    checkWord(rowIndex, colIndex) {
      const cell = this.grid[rowIndex][colIndex];
      const word = this.words.find(w => w.length > 1 && w.includes(cell.value));
      if (word) {
        const startCol = word.indexOf(cell.value);
        const endCol = startCol + word.length - 1;
        const isValid = this.grid[rowIndex].slice(startCol, endCol + 1).every(c => c.value === word[c - startCol]);

        if (isValid) {
          for (let i = startCol; i <= endCol; i++) {
            this.grid[rowIndex][i].correct = true;
          }
        }
      }
    },
  },

  created() {
    this.grid = this.createCrossword(5, 5);

    this.grid = this.placeWords(this.grid)
  }
};
</script>

<style scoped>
.crossword {
  display: inline-block;
  font-family: Arial, sans-serif;
}

.correct {
  background-color: lightgreen;
}
</style>

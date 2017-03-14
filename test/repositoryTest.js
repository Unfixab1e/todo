const Repository = require('../src/repository')
const expect = require('chai').expect
const fs = require('fs')

let repo
describe('repository', function () {
  before(function (done) {
    repo = new Repository()
    let data = '["Eat","Sleep","Play"]'
    fs.writeFile('../src/tasks.dat', data, (err) => {
      if (err) console.log('- failed to initialize data')
      console.log('- Initialized data')
      done()
    })
  })

  describe('#findTask', function () {
    it('should find all the tasks', function (done) {
      repo.findTasks((data) => {
        console.log('- after findTask:', data.toString())
        expect(JSON.parse(data.toString())).have.length.least(0)
        done()
      })
    })
  })

  describe('#addTask', function () {
    it('should add a task', function (done) {
      repo.addTask('foobar', () => {
        repo.findTasks((data) => {
          console.log('- after addTask:', data.toString())
          expect(data.toString()).to.include('foobar')
          done()
        })
      })
    })
  })

  describe('#deleteTask', function () {
    it('should delete a task', function (done) {
      repo.deleteTask('foobar', () => {
        repo.findTasks((data) => {
          console.log('- after deleteTask:', data.toString())
          expect(data.toString()).not.to.include('foobar')
          done()
        })
      })
    })
  })

  describe('#deleteSelectedTasks', function () {
    it('should delete all selected tasks', function (done) {
      repo.deleteSelectedTasks(['Eat', 'Sleep'], () => {
        repo.findTasks((data) => {
          console.log('- after deleteSelectedTasks:')
          expect(data.toString()).not.to.include('Eat').not.to.include('Sleep')
          done()
        })
      })
    })
  })


})

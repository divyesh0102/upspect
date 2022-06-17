/**
 * @jest-environment jsdom
 */

import * as Recoil from '../src'
import * as screens from './fixtures/screens'
import { renderHook, act } from '@testing-library/react-hooks'
import matchMediaPolyfill from 'mq-polyfill'

beforeAll(() => {
  matchMediaPolyfill(window)
  window.resizeTo = function resizeTo (width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height
    }).dispatchEvent(new this.Event('resize'))
  }
})

beforeEach(() => window.resizeTo(1024, 768))

test('should report correct default dimensions', () => {
  const { result } = renderHook(() => Recoil.useViewport())
  expect(result.current.currentWidth).toBe(1024)
  expect(result.current.currentHeight).toBe(768)
})

test('should report correct custom dimensions', () => {
  const { result } = renderHook(() => Recoil.useViewport())
  act(() => window.resizeTo(1280, 720))
  expect(result.current.currentWidth).toBe(1280)
  expect(result.current.currentHeight).toBe(720)
})

test('should report correct min breakpoint', () => {
  const { result } = renderHook(() => Recoil.useViewport(screens.min))
  expect(result.current.activeBreakpoint).toBe('lg')
})

test('should report correct max breakpoint', () => {
  const { result } = renderHook(() => Recoil.useViewport(screens.max))
  expect(result.current.activeBreakpoint).toBe('xl')
})

test('should report correct min-max breakpoint', () => {
  const { result } = renderHook(() => Recoil.useViewport(screens.minMax))
  act(() => window.resizeTo(800, 768))
  expect(result.current.activeBreakpoint).toBe('md')
})

test('should report correct multi-range breakpoint', () => {
  const { result } = renderHook(() => Recoil.useViewport(screens.multiRange))
  act(() => window.resizeTo(700, 768))
  expect(result.current.activeBreakpoint).toBe('md')
})
